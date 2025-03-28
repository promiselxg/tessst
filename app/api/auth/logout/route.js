import { customMessage } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";
import { verifyRefreshToken } from "@/lib/utils/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    try {
      const decoded = verifyRefreshToken(refreshToken); // Ensure this is synchronous
      if (decoded?.id) {
        await prisma.refreshToken.deleteMany({
          where: { userId: decoded.id },
        });
      }
    } catch (error) {
      console.log("Refresh token error:", error);
      return customMessage("Error during token invalidation", {}, 500);
    }
  }

  // Clear cookies using next/headers cookies()
  cookieStore.set("accessToken", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  cookieStore.set("refreshToken", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
};
