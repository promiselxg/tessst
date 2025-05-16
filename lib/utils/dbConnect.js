import { PrismaClient } from "@prisma/client";
import { shippingLoggerMiddleware } from "../middleware/order-shipping-logger";

const globalForPrisma = globalThis;

let prisma = globalForPrisma.prisma ?? new PrismaClient();

prisma.$use(shippingLoggerMiddleware);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
