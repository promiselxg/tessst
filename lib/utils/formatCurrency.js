export function formatCurrency(amount) {
  const num = parseFloat(amount);

  if (isNaN(num)) return "₦0.00";

  if (num >= 1_000_000) {
    return `₦${(num / 1_000_000).toFixed(1)}M`;
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
