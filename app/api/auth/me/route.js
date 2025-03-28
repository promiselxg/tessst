import { customMessage } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";
import { verifyAccessToken } from "@/lib/utils/jwt";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    // ✅ Retrieve access token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return customMessage("Unauthorized", {}, 401);
    }

    // ✅ Verify the access token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return customMessage("Invalid or expired token", {}, 401);
    }

    // ✅ Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        roles: {
          select: { role: true },
        },
        isAdmin: true,
      },
    });

    if (!user) {
      return customMessage("User not found", {}, 404);
    }

    return customMessage("Authenticated user", { user }, 200);
  } catch (error) {
    console.error("Error fetching user:", error);
    return customMessage("Server error", {}, 500);
  }
};
