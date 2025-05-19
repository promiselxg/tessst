import prisma from "../utils/dbConnect";

export const shippingLoggerMiddleware = async (params, next) => {
  if (params.model === "Order" && params.action === "update") {
    const orderId = params.args?.where?.id;
    if (!orderId) return next(params);

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        deliveryStatus: true,
        paymentStatus: true,
        order_Id: true,
        email: true,
      },
    });

    const result = await next(params);

    // Get updated fields
    const updatedDeliveryStatus = params.args.data?.deliveryStatus;
    const updatedPaymentStatus = params.args.data?.paymentStatus;

    const logsToCreate = [];

    if (
      updatedDeliveryStatus &&
      updatedDeliveryStatus !== existingOrder.deliveryStatus
    ) {
      logsToCreate.push({
        orderId,
        status: `Delivery status changed from ${existingOrder.deliveryStatus} to ${updatedDeliveryStatus}`,
        timestamp: new Date(),
      });
    }

    if (
      updatedPaymentStatus &&
      updatedPaymentStatus !== existingOrder.paymentStatus
    ) {
      logsToCreate.push({
        orderId,
        status: `Payment status changed from ${existingOrder.paymentStatus} to ${updatedPaymentStatus}`,
        timestamp: new Date(),
      });
    }

    if (logsToCreate.length > 0) {
      try {
        await prisma.shippingLog.createMany({ data: logsToCreate });
      } catch (err) {
        console.error("Failed to write shipping logs:", err);
      }
    }

    return result;
  }

  return next(params);
};
