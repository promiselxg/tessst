import jwt from "jsonwebtoken";
import prisma from "../utils/dbConnect";
import { customMessage } from "../utils/customMessage";
import { cookies } from "next/headers";

// export async function verifyToken(req) {
//   const authHeader = req.headers.get("Authorization");
//   const token = authHeader?.startsWith("Bearer ")
//     ? authHeader.split(" ")[1]
//     : null;

//   if (!token) {
//     return customMessage("Unauthorized: Token required.", {}, 401);
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//       select: { id: true, roles: true },
//     });

//     if (!user) {
//       return customMessage("User not found", {}, 404);
//     }

//     req.user = user;

//     return;
//   } catch (error) {
//     console.log(error);
//     return customMessage("Invalid Token", {}, 403);
//   }
// }

export async function verifyToken(req) {
  let token;

  // ✅ 1. Check Authorization header
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // ✅ 2. Check cookies if Authorization header is missing
  if (!token) {
    const cookieStore = cookies(); // ✅ Access cookies
    token = cookieStore.get("accessToken")?.value;
  }

  // ✅ 3. Reject if no token is found
  if (!token) {
    return customMessage("Unauthorized: Token required.", {}, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, roles: true },
    });

    if (!user) {
      return customMessage("User not found", {}, 404);
    }

    req.user = user;
    return;
  } catch (error) {
    return customMessage("Invalid Token", {}, 403);
  }
}
