import { NextResponse } from "next/server";

export const middleware = (req) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const isAuthPage = pathname.startsWith("/auth/login");

  console.log("🔎 Checking token in middleware:", token);

  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/login?from=middleware", req.url)
    );
  }

  // Create a response object
  const response = NextResponse.next();

  // Store last visited page before authentication
  if (!isAuthPage) {
    response.cookies.set("redirectUrl", pathname);
  }

  return response;
};

export const config = {
  matcher: ["/dashboard/:path*"],
};
