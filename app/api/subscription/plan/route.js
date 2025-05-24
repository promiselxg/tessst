import { subscriptionControllers } from "@/controller/subscription/subscriptionController";
import { verifyUserRoles } from "@/lib/middleware/verifyRole";
import { verifyToken } from "@/lib/middleware/verifyToken";
import ROLES from "@/lib/utils/roles";
import { withMiddleware } from "@/lib/utils/withMiddleware";

export const POST = async (req) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin))(req, () =>
    subscriptionControllers.createSubscriptionPlan(req)
  );

export const GET = async (req) =>
  subscriptionControllers.listAllSubscriptionPlans(req);
