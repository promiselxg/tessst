import { NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/utils/jwt";

export async function middleware(req) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth/login");
  const isApiRoute = pathname.startsWith("/api");

  // Allow API routes and login page to proceed without authentication checks
  if (isApiRoute || isAuthPage) {
    return NextResponse.next();
  }

  // ✅ Check access token
  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      return NextResponse.next();
    } catch (error) {
      if (error.message !== "TokenExpired") {
        console.log("Invalid access token. Redirecting to login...");
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }
  }

  // ✅ Try refreshing token if expired
  if (refreshToken) {
    console.log("Access token expired, attempting refresh...");
    try {
      const refreshResponse = await fetch(
        `${req.nextUrl.origin}/api/auth/refresh`,
        {
          method: "POST",
          headers: { Cookie: req.headers.get("cookie") }, // ✅ Forward cookies
        }
      );

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await refreshResponse.json();

        const response = NextResponse.next();

        // ✅ Set new access token
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          path: "/",
          maxAge: 15 * 60, // 15 minutes
        });

        if (newRefreshToken) {
          response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
          });
        }

        return response;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  }

  console.log("No valid tokens, redirecting to login...");
  return NextResponse.redirect(new URL("/auth/login", req.url));
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
