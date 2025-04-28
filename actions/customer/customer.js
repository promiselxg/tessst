"use server";

import prisma from "@/lib/utils/dbConnect";

export async function createOrUpdateCustomerInfo(customer, userId) {
  if (!customer?.email) {
    console.error("Cannot upsert customer: Email is missing", customer);
    return null;
  }

  const fullName =
    [customer.first_name, customer.last_name].filter(Boolean).join(" ") ||
    "Unknown";

  const user = await prisma.customer.upsert({
    where: { email: customer.email },
    update: {
      name: fullName,
      id: userId,
    },
    create: {
      id: userId,
      email: customer.email,
      name: fullName,
      phone: customer.phone || null,
      customer_code: customer.customer_code || null,
      metadata: customer.metadata || null,
      phone_format: customer.international_format_phone || null,
      userId,
    },
  });

  return user;
}
