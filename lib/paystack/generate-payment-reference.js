export function generatePaymentReference(prefix = "REF") {
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  const timestamp = Date.now(); // Current time in ms
  return `${prefix}_${randomPart}_${timestamp}`;
}
