import prisma from "../utils/dbConnect";

export async function savePaymentToDB(paymentData) {
  await prisma.payment.create({
    data: {
      reference: paymentData.reference,
      email: paymentData.customer.email,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: paymentData.status,
      paidAt: new Date(paymentData.paid_at),
      metadata: paymentData.metadata,
    },
  });
}
