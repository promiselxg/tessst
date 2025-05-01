import { trainingControllers } from "@/controller/training/trainingControllers";
import { verifyUserRoles } from "@/lib/middleware/verifyRole";
import { verifyToken } from "@/lib/middleware/verifyToken";
import ROLES from "@/lib/utils/roles";
import { withMiddleware } from "@/lib/utils/withMiddleware";
import { parse } from "url";

export const GET = async (req) => {
  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;

  return withMiddleware(
    verifyToken,
    verifyUserRoles(ROLES.admin, ROLES.moderator, ROLES.user)
  )(req, () => trainingControllers.getAllPublishedCourses(req, queryParams));
};
