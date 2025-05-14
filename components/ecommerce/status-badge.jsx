const STATUS_COLORS = {
  payment: {
    PAID: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    FAILED: "bg-red-100 text-red-800",
    REFUNDED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-red-300 text-gray-800",
  },
  order: {
    PAID: "bg-green-100 text-green-800",
    PROCESSING: "bg-yellow-100 text-yellow-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    RETURNED: "bg-red-100 text-red-800",
    CANCELLED: "bg-red-300 text-gray-800",
  },
  delivery: {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_TRANSIT: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
  },
};

export default function StatusBadge({ status, variant = "payment" }) {
  const safeStatus = status?.toUpperCase() || "UNKNOWN";
  const styles =
    STATUS_COLORS[variant]?.[safeStatus] || "bg-slate-100 text-slate-700";

  return (
    <span className={`px-2 py-1 rounded-full text-xs lowercase ${styles}`}>
      {status || "Unknown"}
    </span>
  );
}
