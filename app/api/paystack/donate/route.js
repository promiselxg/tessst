// app/api/paystack/route.js

export async function POST(req) {
  try {
    const { email, amount, callback_url, metadata } = await req.json();

    const params = JSON.stringify({
      email: email,
      amount: amount,
      callback_url,
      metadata,
    });

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: params,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to initialize payment");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
