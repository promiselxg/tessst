const { logWebhookEvent } = require("./webhook-log");

export async function handleWebhookError(
  event,
  data,
  errorMessage,
  statusCode = 500
) {
  console.error(`Error handling ${event}:`, errorMessage);
  await logWebhookEvent(event, "FAILED", data, errorMessage);
  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}
