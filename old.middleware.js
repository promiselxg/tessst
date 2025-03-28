import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/utils/jwt";

export const middleware = async (req) => {
  const { pathname, searchParams } = req.nextUrl;
  const cookieStore = cookies();

  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthPage = pathname.startsWith("/auth/login");
  const isApiRoute = pathname.startsWith("/api");

  console.log("Access Token", accessToken);
  console.log("Refresh Token", refreshToken);

  if (isApiRoute || isAuthPage) {
    return NextResponse.next();
  }

  const redirectToLogin = () => {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set(
      "redirect",
      searchParams.toString() ? `${pathname}?${searchParams}` : pathname
    );

    // Clear cookies before redirecting
    const response = NextResponse.redirect(loginUrl);
    response.headers.set("Set-Cookie", [
      `accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
      `refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
    ]);
    return response;
  };

  // Validate access token if present
  if (accessToken) {
    try {
      const isValidToken = await verifyAccessToken(accessToken);
      if (isValidToken) return NextResponse.next();
    } catch (error) {
      console.error("Access token validation failed:", error);
    }
  }

  // Attempt token refresh if access token is missing or invalid
  if (refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${req.nextUrl.origin}/api/auth/refresh`,
        {
          method: "POST",
          headers: { Cookie: `refreshToken=${refreshToken}` },
        }
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const newAccessToken = data.data?.accessToken;

        if (newAccessToken) {
          const response = NextResponse.next();
          response.headers.set(
            "Set-Cookie",
            `accessToken=${newAccessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=900`
          );
          return response;
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  }

  return redirectToLogin();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    // Add other protected routes here
  ],
};
