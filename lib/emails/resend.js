import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "okeydeede@gmail.com",
      subject,
      html,
    });
    console.log("Resend: Email sent");
  } catch (error) {
    console.error("Resend error:", error.message);
  }
};
