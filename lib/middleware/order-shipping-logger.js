import { sendResendEmail } from "../emails/resend";
import prisma from "../utils/dbConnect";

// Prisma middleware
export const shippingLoggerMiddleware = async (params, next) => {
  // Only intercept Order updates
  if (params.model === "Order" && params.action === "update") {
    const orderId = params.args?.where?.id;

    if (!orderId) return next(params); // safety check

    // Fetch the current (before-update) order
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        deliveryStatus: true,
        order_Id: true,
        email: true,
      },
    });

    // Continue to the actual update
    const result = await next(params);

    // If delivery status changed, log it + notify
    const updatedStatus = params.args.data?.deliveryStatus;
    if (updatedStatus && updatedStatus !== existingOrder.deliveryStatus) {
      // 1. Log the status change
      await prisma.shippingLog.create({
        data: {
          orderId,
          status: `Delivery status changed to ${updatedStatus}`,
          note: `Auto-logged from middleware`,
          timestamp: new Date(),
        },
      });

      // 2. Send email notification
      await sendResendEmail({
        email: existingOrder.email,
        subject: `Delivery status changed to ${updatedStatus}`,
        html: `<p>Hello,</p>
           <p>Your order <strong>#${existingOrder.order_Id}</strong> delivery status has been updated to:</p>
           <p><strong>${updatedStatus}</strong></p>
           <p>Thank you for shopping with us.</p>`,
      });
    }

    return result;
  }

  // Proceed with all other queries unchanged
  return next(params);
};
