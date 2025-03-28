import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken } from "@/lib/utils/jwt";
import prisma from "@/lib/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Please enter your username and password." },
        { status: 400 }
      );
    }

    // Find user in DB
    const user = await prisma.user.findFirst({
      where: { username },
      include: { roles: true, refreshTokens: true },
    });

    // Validate user & password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate access & refresh tokens
    const roles = user.roles.map((role) => role.role);
    const accessToken = await generateToken(
      user.id,
      roles,
      user.isAdmin,
      username
    );
    const refreshToken = await generateRefreshToken(user.id);

    // Delete previous refresh tokens (optional for security)
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

    // Store new refresh token in DB
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // ✅ Create response and set cookies properly
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email_address,
          roles,
          isAdmin: user.isAdmin,
        },
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );

    // Set HTTP-only secure cookies
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
