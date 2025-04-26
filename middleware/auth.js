import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/utils/jwt";

export async function handleAuth(req) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname, search, origin } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth/login");
  const isApiRoute = pathname.startsWith("/api");

  console.log("ACCESS TOKEN", accessToken);
  console.log("==============================");
  console.log("REFRESH TOKEN", refreshToken);

  // Allow API routes and login page to proceed without authentication checks
  if (isApiRoute || isAuthPage) {
    return NextResponse.next();
  }

  // ✅ Function to refresh tokens
  const generateRefreshToken = async () => {
    try {
      const refreshResponse = await fetch(`${origin}/api/auth/refresh`, {
        method: "POST",
        headers: { Cookie: req.headers.get("cookie") },
      });

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

    return redirectToLogin(req);
  };

  // ✅ Function to redirect user to login with a "callbackUrl"
  const redirectToLogin = (req) => {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  };

  // ✅ Check access token
  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      return NextResponse.next();
    } catch (error) {
      if (error.message !== "TokenExpired") {
        console.log("Invalid access token. Redirecting to login...");
        return redirectToLogin(req);
      }
    }
  }

  // ✅ Try refreshing token if expired
  if (refreshToken) {
    console.log("Access token expired, attempting refresh...");
    return await generateRefreshToken();
  }
  return redirectToLogin(req);
}
