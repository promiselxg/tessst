"use server";

import prisma from "@/lib/utils/dbConnect";

export const logAudit = async ({
  orderId,
  userId,
  changes,
  action = "UPDATE",
}) => {
  await prisma.audit.create({
    data: {
      orderId,
      userId,
      action,
      changes: JSON.stringify(changes),
    },
  });
};
