"use server";

export const logActivity = async ({ action, description, orderId, userId }) => {
  console.log(
    `[LOG] ${action}: ${description} (Order: ${orderId}, By: ${userId})`
  );
  // You can insert into an "ActivityLog" table here
};
