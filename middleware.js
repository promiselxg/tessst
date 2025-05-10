import { handleAuth } from "./middleware/auth";
import { handleCors } from "./middleware/cors";

export async function middleware(req) {
  // ✅ Handle CORS for /api routes
  if (req.nextUrl.pathname.startsWith("/api")) {
    if (req.method === "OPTIONS") {
      return handleCors(req);
    }
  }

  // ✅ Handle authentication checks for protected routes
  return handleAuth(req);
}

// Apply to specific routes
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/resources/training/:path*"],
};
