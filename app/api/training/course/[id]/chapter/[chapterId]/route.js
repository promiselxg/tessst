import { trainingControllers } from "@/controller/training/trainingControllers";
import { verifyUserRoles } from "@/lib/middleware/verifyRole";
import { verifyToken } from "@/lib/middleware/verifyToken";
import ROLES from "@/lib/utils/roles";
import { withMiddleware } from "@/lib/utils/withMiddleware";

export const PATCH = async (req, { params }) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin, ROLES.moderator))(
    req,
    () => trainingControllers.updateCourseChapter(req, params)
  );

export const DELETE = async (req, { params }) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin, ROLES.moderator))(
    req,
    () => trainingControllers.deleteCourseChapter(req, params)
  );

export const GET = async (req, { params }) =>
  withMiddleware(
    verifyToken,
    verifyUserRoles(ROLES.admin, ROLES.moderator, ROLES.user)
  )(req, () => trainingControllers.getSingleChapter(req, params));
