"use server";
import prisma from "@/lib/utils/dbConnect";

export async function saveDonation(data) {
  const isAnonymous =
    data.metadata.isAnonymous?.toLowerCase() === "true" ||
    data.customer.isAnonymous?.toLowerCase() === "true";

  const donation = await prisma.donation.create({
    data: {
      campaignId: data.metadata.orderId,
      reference: data.reference,
      firstName: data.customer.first_name || data.metadata.first_name || null,
      lastName: data.customer.last_name || data.metadata.last_name || null,
      phone:
        data.customer.international_format_phone || data.metadata.phone || null,
      customer_code: data.customer.customer_code,
      email: data.customer.email,
      amount: data.amount,
      status: "SUCCESS",
      isAnonymous,
      paid_At: data.paid_at,
    },
  });

  return donation;
}
