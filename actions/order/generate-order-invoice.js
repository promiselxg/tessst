"use server";

import { logActivity } from "../log/logger";
import { logAudit } from "../log/audit";
import prisma from "@/lib/utils/dbConnect";

//import InvoiceTemplate from "@/lib/templates/pdf/order-invoice-template";

export async function generateOrderInvoice(orderId, userId) {
  console.log(orderId, userId);
  try {
    if (!orderId || !userId) {
      return { success: false, error: "Order ID is required" };
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        orderItems: true,
        payment: true,
      },
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    const subtotal = order.orderItems.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity;
    }, 0);

    const deliveryFee = Number(order.delivery_fee) || 0;
    const total = subtotal + deliveryFee;

    const existingInvoice = await prisma.invoice.findUnique({
      where: { orderId: order.id },
    });

    if (existingInvoice) {
      return {
        success: false,
        error: "Invoice already exists for this order.",
      };
    }

    await prisma.invoice.create({
      data: {
        orderId: order.id,
        userId,
        customerEmail: order.email,
        total: total,
        issuedAt: new Date(),
        status: "ISSUED",
        metadata: {
          customerName: order.user?.name || "",
          paymentMethod: order.payment?.method || "N/A",
        },
      },
    });

    // const pdfBuffer = await renderToBuffer(
    //   <InvoiceTemplate invoice={newInvoice} order={order} />
    // );

    // await resend.emails.send({
    //   from: "no-reply@yourdomain.com",
    //   to: order.email,
    //   subject: `Invoice for Order ${order.order_Id}`,
    //   html: `<p>Hello ${order.user?.name || "Customer"},</p><p>Your invoice is attached.</p>`,
    //   attachments: [
    //     {
    //       filename: `invoice-${invoice.id}.pdf`,
    //       content: pdfBuffer.toString("base64"),
    //       type: "application/pdf",
    //       disposition: "attachment",
    //     },
    //   ],
    // });

    // Logging, Auditing
    if (!existingInvoice) {
      await logActivity({
        action: "Generate Order Invoice",
        description: `Order invoice generated for Order ${orderId}`,
        orderId,
        userId,
      });
    }

    await logAudit({
      orderId,
      userId,
      action: "CREATE",
    });
    return {
      success: true,
    };
  } catch (error) {
    return { success: false, error: "Invoice generation failed" };
  }
}
