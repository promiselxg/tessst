import { NextResponse } from "next/server";
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
import InvoiceTemplate from "@/lib/templates/pdf/order-invoice-template";
import { generateOrderInvoice } from "@/actions/order/generate-order-invoice";
import ROLES from "@/lib/utils/roles";

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
        invoice: true,
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

// const refundOrder = async (req, params) => {
//   try {
//     const { orderId } = params;
//     const { reason } = await req.json();

//     const order = await prisma.order.findUnique({
//       where: { id: orderId },
//       include: { payment: true },
//     });

//     if (!order || order.status !== "PAID") {
//       return customMessage("Only paid orders can be refunded", {}, 400);
//     }

//     const payment = order.payment;
//     if (!payment?.reference) {
//       return customMessage(
//         "No valid Paystack reference found for this payment",
//         {},
//         400
//       );
//     }

//     // Call Paystack API
//     const refundResult = await refundViaPaystack(payment.reference);

//     // Update records
//     await prisma.order.update({
//       where: { id: orderId },
//       data: {
//         status: "REFUNDED",
//         metadata: {
//           ...order.metadata,
//           refundReason: reason,
//           refundedAt: new Date(),
//         },
//       },
//     });

//     await prisma.payment.update({
//       where: { id: payment.id },
//       data: {
//         status: "REFUNDED",
//       },
//     });

//     // Notify user
//     await sendEmail({
//       to: order.email,
//       subject: `Order #${orderId} Refunded`,
//       html: `<p>Your payment has been refunded. Reason: ${reason}</p>`,
//     });

//     return customMessage("Order refunded successfully", { refundResult }, 200);
//   } catch (error) {
//     console.error(error);
//     return ServerError(error, {}, 500);
//   }
// };

const previewOrderInvoice = async (req, params) => {
  try {
    const { orderId } = await params;

    const order = await prisma.order.findUnique({
      where: { order_Id: orderId },
      include: { user: true, orderItems: true },
    });

    const invoice = await prisma.invoice.findUnique({
      where: { orderId: order.id },
    });

    if (!order || !invoice) {
      return customMessage("Invoice not found", {}, 404);
    }

    const pdfBuffer = await renderToBuffer(
      <InvoiceTemplate invoice={invoice} order={order} />
    );

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="invoice-${invoice.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Preview error:", error);
    return ServerError(error, {}, 500);
  }
};

const generateManualInvoice = async (req) => {
  try {
    const { orderId, userId } = await req.json();

    if (!orderId || !userId) {
      return customMessage("Missing orderId or userId", {}, 400);
    }

    const response = await generateOrderInvoice(orderId, userId);

    if (response.success) {
      return customMessage("Invoice generated successfully", { response }, 200);
    } else {
      return customMessage("Failed to generate invoice", { response }, 200);
    }
  } catch (error) {
    console.error("Error generating invoice for orderId/userId", error);
    return ServerError(error, {}, 500);
  }
};

const createOrderReview = async (req) => {
  try {
    const { orderId, productId, userId, rating, comment } = await req.json();

    if (!orderId || !productId || !userId || !rating) {
      return customMessage("Missing required fields", {}, 400);
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) {
      return customMessage("Order not found", {}, 404);
    }

    const purchasedProduct = order.orderItems.find(
      (item) => item.productId === productId
    );

    if (!purchasedProduct) {
      return customMessage("Product not found in this order", {}, 403);
    }

    const existingReview = await prisma.productReview.findFirst({
      where: {
        userId,
        productId,
        orderId,
      },
    });

    if (existingReview) {
      return customMessage(
        "You already reviewed this product in this order",
        {},
        409
      );
    }

    const review = await prisma.productReview.create({
      data: {
        userId,
        orderId,
        productId,
        rating,
        comment,
      },
    });

    await recalculateAverageRating(productId);

    return customMessage("Review submitted successfully", { review }, 201);
  } catch (error) {
    console.error("Review Error:", error);
    return ServerError(error, {}, 500);
  }
};

const updateOrderReview = async (req, params) => {
  try {
    const { reviewId } = await params;
    const { rating, comment, userId } = await req.json();

    if (!reviewId || !rating) {
      return customMessage("Review ID and rating are required", {}, 400);
    }

    const existingReview = await prisma.productReview.findUnique({
      where: { id: reviewId, userId },
    });

    if (!existingReview) {
      return customMessage("Review not found", {}, 404);
    }

    const updatedReview = await prisma.productReview.update({
      where: { id: reviewId },
      data: {
        rating,
        comment,
      },
    });

    await recalculateAverageRating(existingReview.productId);

    return customMessage("Review updated", { updatedReview }, 200);
  } catch (error) {
    console.error("Update Review Error:", error);
    return ServerError(error, {}, 500);
  }
};

const deleteOrderReview = async (req, params) => {
  try {
    const { reviewId } = await params;

    if (!reviewId || !req.user.id || !req?.user?.roles) {
      return customMessage("Missing required fields", {}, 400);
    }

    const existingReview = await prisma.ProductReview.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return customMessage("Review not found", {}, 404);
    }

    // Extract roles from user.roles
    const roleValues = req.user.roles.map((r) => r.role);
    const isPrivileged =
      roleValues.includes(ROLES.admin) || roleValues.includes(ROLES.moderator);
    const isOwner = existingReview.userId === req.user.id;

    if (!isPrivileged && !isOwner) {
      return customMessage("Unauthorized to delete this review", {}, 403);
    }

    await prisma.ProductReview.delete({ where: { id: reviewId } });

    // Recalculate average rating
    await recalculateAverageRating(existingReview.productId);

    return customMessage("Review deleted successfully", {}, 200);
  } catch (error) {
    console.error("Delete Review Error:", error);
    return ServerError(error, {}, 500);
  }
};

const getOrderByReference = async (req, params) => {};

const recalculateAverageRating = async (productId) => {
  const reviews = await prisma.productReview.findMany({
    where: { productId },
    select: { rating: true },
  });

  const avgRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length ||
    0;

  await prisma.product.update({
    where: { id: productId },
    data: { averageRating: Number(avgRating.toFixed(1)) },
  });
};

export const orderControllers = {
  getOrderByReference,
  getAllOrders,
  getOrderByOrderId,
  updateOrderDetails,
  cancelOrder,
  //refundOrder,
  previewOrderInvoice,
  generateManualInvoice,
  createOrderReview,
  updateOrderReview,
  deleteOrderReview,
};
