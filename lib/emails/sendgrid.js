import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const sendEmail = async ({ to, subject, html }) => {
  const msg = {
    to,
    from: "no-reply@yourdomain.com",
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent to", to);
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
  }
};
