import { competitionControllers } from "@/controller/competition/competitionController";
import { verifyUserRoles } from "@/lib/middleware/verifyRole";
import { verifyToken } from "@/lib/middleware/verifyToken";
import ROLES from "@/lib/utils/roles";
import { withMiddleware } from "@/lib/utils/withMiddleware";

export const GET = async (req, { params }) =>
  competitionControllers.deleteSingleContest(req, params);

export const PATCH = async (req, { params }) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin, ROLES.moderator))(
    req,
    () => competitionControllers.updateSingleContest(req, params)
  );

export const DELETE = async (req, { params }) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin, ROLES.moderator))(
    req,
    () => competitionControllers.deleteSingleContest(req, params)
  );
