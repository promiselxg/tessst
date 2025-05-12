import { z } from "zod";
import { logAudit } from "@/actions/log/audit";
import { logActivity } from "@/actions/log/logger";
import { notifyCustomerViaMail } from "@/lib/helpers/email-notification";
import { customMessage, ServerError } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";
import { generateRandomString } from "@/lib/utils/randomStringGenerator";
import {
  validateRequestBodyFromArray,
  validateRequestBodyWithZod,
} from "@/lib/utils/validateRequestBody";

const updateSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  orderStatus: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]).optional(),
  paymentMethod: z
    .enum(["CARD", "PAYPAL", "BANK_TRANSFER", "CASH_ON_DELIVERY"])
    .optional(),
  currency: z.string().optional(),
});

const getAllOrders = async (req) => {
  const query = req.nextUrl.searchParams;

  const status = query.get("status")?.trim().toUpperCase();
  const validStatuses = ["PENDING", "PAID", "FAILED", "REFUNDED"];
  const date = query.get("date")?.trim();
  const startDateParam = query.get("startDate")?.trim();
  const endDateParam = query.get("endDate")?.trim();

  try {
    const filters = {};

    if (status && validStatuses.includes(status)) {
      filters.orderStatus = status;
    }

    if (startDateParam && endDateParam) {
      const startDate = new Date(startDateParam);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(endDateParam);
      endDate.setHours(23, 59, 59, 999);

      filters.createdAt = {
        gte: startDate,
        lte: endDate,
      };
    } else if (date) {
      const singleDate = new Date(date);
      const start = new Date(singleDate);
      const end = new Date(singleDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      filters.createdAt = {
        gte: start,
        lte: end,
      };
    }

    const orders = await prisma.order.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        payment: {
          select: {
            method: true,
            reference: true,
            currency: true,
          },
        },
        orderItems: true,
      },
    });

    return customMessage(
      "Orders retrieved successfully",
      { count: orders.length, orders },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const getOrderByOrderId = async (req) => {
  try {
    const body = await req.json();
    const { valid, message } = validateRequestBodyFromArray(body, ["orderId"]);

    if (!valid) {
      return customMessage(message, {}, 400);
    }

    const order = await prisma.order.findUnique({
      where: {
        order_Id: body.orderId,
      },
      include: {
        user: true,
        orderItems: true,
        payment: true,
        invoice: true,
      },
    });

    if (!order) {
      return customMessage("No order found with this ID.", {}, 404);
    }

    return customMessage("Order retrieved successfully", { order }, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const updateOrderDetails = async (req) => {
  try {
    const { valid, data, errors } = await validateRequestBodyWithZod(
      req,
      updateSchema
    );
    if (!valid) return customMessage(errors, {}, 400);

    const { orderId, orderStatus, paymentMethod, currency } = data;

    if (!req.user.id) {
      return customMessage("Invalid user credentials", {}, 404);
    }
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true, user: true },
    });

    if (!existingOrder) {
      return customMessage("Order not found", {}, 404);
    }

    const orderUpdateData = {};
    const paymentUpdateData = {};
    let changes = {};

    if (orderStatus === "PAID") {
      if (!paymentMethod || !currency) {
        return customMessage(
          "Payment method and currency are required when marking as PAID",
          {},
          400
        );
      }

      const reference = `ORD-` + generateRandomString(9);

      orderUpdateData.orderStatus = "PAID";
      orderUpdateData.paymentStatus = "PAID";
      orderUpdateData.paidAt = new Date();
      orderUpdateData.paymentReference = reference;

      paymentUpdateData.status = "PAID";
      paymentUpdateData.method = paymentMethod;
      paymentUpdateData.currency = currency;
      paymentUpdateData.reference = reference;

      changes = {
        status: "PAID",
        paidAt: new Date(),
        paymentReference: reference,
        paymentStatus: "PAID",
        paymentMethod,
        currency,
      };
    } else if (orderStatus) {
      orderUpdateData.orderStatus = orderStatus;
      changes = { status: orderStatus };
    }

    // Update order
    const updatedOrder = Object.keys(orderUpdateData).length
      ? await prisma.order.update({
          where: { id: orderId },
          data: orderUpdateData,
        })
      : existingOrder;

    // Update payment
    const updatedPayment =
      Object.keys(paymentUpdateData).length && existingOrder.payment
        ? await prisma.payment.update({
            where: { id: existingOrder.payment.id },
            data: paymentUpdateData,
          })
        : existingOrder.payment;

    // Logging, Auditing, Notification
    await logActivity({
      action: "Order Update",
      description: `Order ${orderId} updated by ${req.user.username}`,
      orderId,
      userId: req.user.id,
    });

    await logAudit({
      orderId,
      userId: req.user.id,
      action: "UPDATE",
      changes,
    });

    if (orderStatus === "PAID") {
      await notifyCustomerViaMail({
        email: existingOrder.email,
        subject: "Your order has been marked as PAID",
        message: `Hi, your order #${orderId} has been marked as paid. Thank you!`,
      });
    }

    return customMessage(
      "Order updated successfully",
      {
        order: updatedOrder,
        payment: updatedPayment,
      },
      200
    );
  } catch (error) {
    console.error("Update error:", error);
    return ServerError(error, {}, 500);
  }
};

const cancelOrder = async (req, params) => {
  try {
    const { orderId } = params;
    const { reason } = await req.json();

    if (!orderId) {
      return customMessage("Order ID is required", {}, 400);
    }

    const cancelledBy = req.user?.username;

    const order = await prisma.order.findUnique({
      where: { order_Id: orderId },
      include: { user: true, payment: true },
    });

    if (!order) {
      return customMessage("Order not found", {}, 404);
    }

    if (order.orderStatus === "CANCELLED") {
      return customMessage("Order is already cancelled", {}, 400);
    }

    if (
      order.deliveryStatus === "SHIPPED" ||
      order.deliveryStatus === "DELIVERED"
    ) {
      return customMessage(
        "Order has already been sent out for delivery and cannot be cancelled.",
        {},
        400
      );
    }

    if (order.paymentStatus === "PAID") {
      return customMessage(
        "Cannot cancel a paid order. Please refund instead.",
        {},
        400
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { order_Id: orderId },
      data: {
        orderStatus: "CANCELLED",
        paymentStatus: "CANCELLED",
        metadata: {
          ...order.metadata,
          cancelReason: reason || "No reason provided",
          cancelledBy,
          cancelledAt: new Date(),
        },
      },
    });

    if (order.payment) {
      await prisma.payment.update({
        where: { id: order.payment.id },
        data: { status: "CANCELLED" },
      });
    }

    // Optional email

    return customMessage("Order cancelled successfully", { updatedOrder }, 200);
  } catch (error) {
    console.error("Cancel error:", error);
    return ServerError(error, {}, 500);
  }
};

const generateOrderInvoice = async (req, params) => {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return customMessage("Order ID is required", {}, 400);
    }

    const order = await prisma.order.findUnique({
      where: { order_Id: orderId },
      include: {
        user: true,
        orderItems: true,
        payment: true,
      },
    });

    if (!order) {
      return customMessage("Order not found", {}, 404);
    }

    const total = order.orderItems.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity;
    }, 0);

    const existingInvoice = await prisma.invoice.findUnique({
      where: { orderId: order.id },
    });

    if (existingInvoice) {
      return customMessage(
        "Invoice already exists for this order.",
        { invoice: existingInvoice },
        200
      );
    }

    const newInvoice = await prisma.invoice.create({
      data: {
        orderId: order.id,
        customerEmail: order.email,
        amount: total,
        issuedAt: new Date(),
        status: "ISSUED",
        metadata: {
          customerName: order.user?.name || "",
          paymentMethod: order.payment?.method || "N/A",
        },
      },
    });

    return customMessage(
      "Invoice generated successfully",
      { invoice: newInvoice },
      201
    );
  } catch (error) {
    console.error("Invoice generation error:", error);
    return ServerError(error, {}, 500);
  }
};

const refundOrder = async (req, params) => {
  try {
    const { orderId } = params;
    const { reason } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    });

    if (!order || order.status !== "PAID") {
      return customMessage("Only paid orders can be refunded", {}, 400);
    }

    const payment = order.payment;
    if (!payment?.reference) {
      return customMessage(
        "No valid Paystack reference found for this payment",
        {},
        400
      );
    }

    // Call Paystack API
    const refundResult = await refundViaPaystack(payment.reference);

    // Update records
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "REFUNDED",
        metadata: {
          ...order.metadata,
          refundReason: reason,
          refundedAt: new Date(),
        },
      },
    });

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "REFUNDED",
      },
    });

    // Notify user
    await sendEmail({
      to: order.email,
      subject: `Order #${orderId} Refunded`,
      html: `<p>Your payment has been refunded. Reason: ${reason}</p>`,
    });

    return customMessage("Order refunded successfully", { refundResult }, 200);
  } catch (error) {
    console.error(error);
    return ServerError(error, {}, 500);
  }
};

const getOrderByReference = async (req, params) => {};

export const orderControllers = {
  getOrderByReference,
  getAllOrders,
  getOrderByOrderId,
  updateOrderDetails,
  cancelOrder,
  refundOrder,
  generateOrderInvoice,
};
