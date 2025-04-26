import { NextResponse } from "next/server";

export function handleCors(req) {
  const response = new NextResponse(null, { status: 204 });

  // Handle OPTIONS method for preflight requests
  if (req.method === "OPTIONS") {
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://l7zxvdd4-3000.uks1.devtunnels.ms",
      "https://ysfon-official.vercel.app"
    ); // Change this to the exact origin
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    return response;
  }

  // Handle other requests
  const allowedOrigins = [
    "http://localhost:3000", // Change to the origin of your local dev server
    "https://l7zxvdd4-3000.uks1.devtunnels.ms", // This should match the origin of the frontend
    "https://ysfon-official.vercel.app",
  ];

  const origin = req.headers.get("origin");

  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin); // Allow the specific origin
  } else {
    // This should not be a wildcard when using credentials
    response.headers.set("Access-Control-Allow-Origin", origin); // Allow the specific origin
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}
