import { orderControllers } from "@/controller/order/orderController";
import { verifyUserRoles } from "@/lib/middleware/verifyRole";
import { verifyToken } from "@/lib/middleware/verifyToken";
import ROLES from "@/lib/utils/roles";
import { withMiddleware } from "@/lib/utils/withMiddleware";

export const GET = async (req) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin))(req, () =>
    orderControllers.getAllOrders(req)
  );

export const POST = async (req) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin))(req, () =>
    orderControllers.getOrderByOrderId(req)
  );

export const PATCH = async (req) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin))(req, () =>
    orderControllers.updateOrderDetails(req)
  );
