import { competitionControllers } from "@/controller/competition/competitionController";
import { verifyUserRoles } from "@/lib/middleware/verifyRole";
import { verifyToken } from "@/lib/middleware/verifyToken";
import ROLES from "@/lib/utils/roles";
import { withMiddleware } from "@/lib/utils/withMiddleware";

export const POST = async (req) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin, ROLES.moderator))(
    req,
    () => competitionControllers.createNewCompetition(req)
  );

export const GET = async (req) =>
  competitionControllers.getAllCompetitions(req);

export const DELETE = async (req) =>
  withMiddleware(verifyToken, verifyUserRoles(ROLES.admin, ROLES.moderator))(
    req,
    () => competitionControllers.deleteMultipleContest(req)
  );
