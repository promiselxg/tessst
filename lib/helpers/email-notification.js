import { sendResendEmail } from "../emails/resend";
import { paymentSuccessTemplate } from "../templates/order/email-success-template";

export const notifyCustomerViaMail = async ({
  email,
  subject,
  message,
  orderId,
}) => {
  console.log(`Sending notification to ${email} - ${subject}`);

  await sendResendEmail({
    to: "okeydeede@gmail.com",
    subject,
    html: paymentSuccessTemplate({
      orderId,
      customerName: "Customer",
      message,
    }),
  });
};
