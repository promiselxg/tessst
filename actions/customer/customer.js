"use server";

export async function createOrUpdateCustomerInfo(tx, customer, userId) {
  if (!customer?.email) {
    return null;
  }

  const fullName =
    [customer.first_name, customer.last_name].filter(Boolean).join(" ") ||
    "Unknown";

  const user = await tx.customer.upsert({
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
    },
  });

  return user;
}
