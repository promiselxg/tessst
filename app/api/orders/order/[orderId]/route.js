import { orderControllers } from "@/controller/order/orderController";
import { verifyUserRoles } from "@/lib/middleware/verifyRole";
import { verifyToken } from "@/lib/middleware/verifyToken";
import ROLES from "@/lib/utils/roles";
import { withMiddleware } from "@/lib/utils/withMiddleware";

export const PATCH = async (req, { params }) =>
  withMiddleware(
    verifyToken,
    verifyUserRoles(ROLES.admin, ROLES.moderator, ROLES.user)
  )(req, () => orderControllers.cancelOrder(req, params));
