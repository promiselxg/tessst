function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const fieldMap = {
  order_Id: { label: "Order ID", get: (o) => o.order_Id },
  customer_name: {
    label: "Customer Name",
    get: (o) => o.user?.name || "Unknown",
  },
  email: { label: "Email", get: (o) => o.email },
  amount: { label: "Amount (₦)", get: (o) => o.amount },
  delivery_fee: { label: "Delivery Fee (₦)", get: (o) => o.delivery_fee },
  paymentStatus: { label: "Payment Status", get: (o) => o.paymentStatus },
  orderStatus: { label: "Order Status", get: (o) => o.orderStatus },
  deliveryStatus: { label: "Delivery Status", get: (o) => o.deliveryStatus },
  city: { label: "City", get: (o) => o.metadata?.city || "" },
  state: { label: "State", get: (o) => o.metadata?.state || "" },
  delivery_address: {
    label: "Delivery Address",
    get: (o) => o.metadata?.delivery_address || "",
  },
  cancelReason: {
    label: "Cancel Reason",
    get: (o) => o.metadata?.cancelReason || "",
  },
  createdAt: { label: "Created At", get: (o) => formatDate(o.createdAt) },
};

export function exportOrdersAsCSV(orders, selectedFields) {
  if (!selectedFields || selectedFields.length === 0) {
    selectedFields = [
      "order_Id",
      "customer_name",
      "email",
      "amount",
      "orderStatus",
      "createdAt",
    ];
  }

  const headers = selectedFields.map(
    (field) => fieldMap[field]?.label || field
  );

  const rows = orders.map((order) =>
    selectedFields.map((field) => fieldMap[field]?.get(order) ?? "")
  );

  return [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");
}
