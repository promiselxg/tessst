export function formatCurrency(amount) {
  if (amount >= 1000000) {
    return "₦" + (amount / 1000000).toFixed(2) + "m";
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  }
}
