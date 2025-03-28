import { verifyAccessToken } from "@/lib/utils/jwt";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const accessToken = req.headers.get("authorization")?.split(" ")[1];

    if (!accessToken) {
      return NextResponse.json(
        { message: "No access token provided" },
        { status: 401 }
      );
    }

    const decoded = verifyAccessToken(accessToken);

    return NextResponse.json(
      { message: "Token is valid", user: decoded },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token", error: error.message },
      { status: 401 }
    );
  }
};
