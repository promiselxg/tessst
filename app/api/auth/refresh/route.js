import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateToken, verifyRefreshToken } from "@/lib/utils/jwt";
import prisma from "@/lib/utils/dbConnect";

export const POST = async (req) => {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token provided" },
        { status: 401 }
      );
    }

    // ✅ Verify refresh token
    const decoded = await verifyRefreshToken(refreshToken);

    // ✅ Check if refresh token exists in DB
    const storedToken = await prisma.refreshToken.findFirst({
      where: { token: refreshToken, userId: decoded.id },
    });

    if (!storedToken) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    // ✅ Generate new access token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { roles: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const roles = user.roles.map((role) => role.role);
    const newAccessToken = await generateToken(
      user.id,
      roles,
      user.isAdmin,
      user.username
    );

    // ✅ Set new access token in cookies
    const response = NextResponse.json(
      { accessToken: newAccessToken },
      { status: 200 }
    );

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid refresh token", error: error.message },
      { status: 403 }
    );
  }
};
