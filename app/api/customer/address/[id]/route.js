import { userControllers } from "@/controller/user/userController";
export const GET = async (req, { params }) =>
  userControllers.getLoggedInCustomerAddress(req, params);
