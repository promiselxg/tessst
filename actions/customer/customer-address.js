"use server";

import prisma from "@/lib/utils/dbConnect";

export async function createOrUpdateCustomerAddress(userId, customer) {
  if (!customer) {
    return null;
  }
}
