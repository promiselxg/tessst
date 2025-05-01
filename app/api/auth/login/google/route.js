import { NextResponse } from "next/server";
import prisma from "@/lib/utils/dbConnect";

import ROLES from "@/lib/utils/roles";
import { generateRefreshToken, generateToken } from "@/lib/utils/jwt";

export const POST = async (req) => {
  try {
    const { email, name, avatar, provider } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Missing required Google user information." },
        { status: 400 }
      );
    }

    let user = await prisma.user.findFirst({
      where: { email_address: email },
      include: { roles: true, refreshTokens: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email_address: email,
          username: email.split("@")[0],
          name,
          avatar,
          provider: provider || "google",
          roles: {
            create: [{ role: ROLES.user }],
          },
        },
        include: { roles: true },
      });
    }

    const userRoles = user.roles.map((r) => r.role);
    const isAdmin = userRoles.includes(ROLES.admin);

    const accessToken = await generateToken(
      user.id,
      userRoles,
      isAdmin,
      user.username
    );

    const refreshToken = await generateRefreshToken(user.id);

    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const response = NextResponse.json(
      {
        message: "Google login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email_address,
          roles: userRoles,
          avatar: user.avatar,
          isAdmin,
        },
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Google login error", error: error.message },
      { status: 500 }
    );
  }
};
