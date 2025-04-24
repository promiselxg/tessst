import { SignJWT, errors, jwtVerify } from "jose";

// Convert secret key to Uint8Array
const getJwtSecret = () => new TextEncoder().encode(process.env.JWT_SECRET);
const getRefreshSecret = () =>
  new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

// 🔹 Generate Access Token
export const generateToken = async (id, roles, isAdmin, username) => {
  return new SignJWT({ id, roles, isAdmin, username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + 15 * 60) // 15 minutes
    .sign(getJwtSecret());
};

// 🔹 Generate Refresh Token
export const generateRefreshToken = async (id) => {
  return new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getRefreshSecret());
};

// 🔹 Verify Access Token
export const verifyAccessToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      throw new Error("TokenExpired");
    }
    throw new Error("InvalidToken");
  }
};

// 🔹 Verify Refresh Token
export const verifyRefreshToken = async (token) => {
  const { payload } = await jwtVerify(token, getRefreshSecret());
  return payload;
};
