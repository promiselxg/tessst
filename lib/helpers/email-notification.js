// import { paymentSuccessTemplate } from "../templates/order/email-success-template";
// import { sendEmail } from "../emails/sendgrid";
// import { sendResendEmail } from "../emails/resend";

export const notifyCustomerViaMail = async ({ email, subject, message }) => {
  console.log(`Sending notification to ${email} - ${subject}`);
  // Using Sendgrid

  // await sendEmail({
  //   to: existingOrder.email,
  //   subject: "Payment Successful - Order #" + orderId,
  //   html: paymentSuccessTemplate({
  //     orderId,
  //     customerName: existingOrder.user?.name || "Customer",
  //     message,
  //   }),
  // });

  // Using resend

  // await sendResendEmail({
  //   to: existingOrder.email,
  //   subject: "Payment Successful - Order #" + orderId,
  //   html: paymentSuccessTemplate({
  //     orderId,
  //     customerName: existingOrder.user?.name || "Customer",
  //   }),
  // });
};
