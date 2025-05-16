export const paymentSuccessTemplate = ({ customerName, message }) => `
  <div style="font-family: sans-serif; padding: 20px;">
    <h2>Payment Confirmation</h2>
    <p>Hi ${customerName},</p>
    <p>${message}</p>
    <p>Thank you for your purchase!</p>
    <br />
    <p>— The Team</p>
  </div>
`;
