export const orderCancelledTemplate = ({ customerName, orderId, reason }) => `
  <div style="font-family: sans-serif; padding: 20px;">
    <h2>Order Cancelled</h2>
    <p>Hi ${customerName},</p>
    <p>Your order <strong>#${orderId}</strong> has been cancelled.</p>
    <p><strong>Reason:</strong> ${reason}</p>
    <p>If you have any questions, please contact support.</p>
    <br/>
    <p>— The Team</p>
  </div>
`;
