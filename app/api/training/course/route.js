import { trainingControllers } from "@/controller/training/trainingControllers";
import { verifyUserRoles } from "@/lib/middleware/verifyRole";
import { verifyToken } from "@/lib/middleware/verifyToken";
import ROLES from "@/lib/utils/roles";
import { withMiddleware } from "@/lib/utils/withMiddleware";

export const GET = async (req) => trainingControllers.getAllCourses(req);

export const DELETE = async (req) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin))(req, () =>
    trainingControllers.deleteMultipleCourses(req)
  );
