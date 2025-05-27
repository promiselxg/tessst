import { subscriptionControllers } from "@/controller/subscription/subscriptionController";

export const GET = async (req, { params }) =>
  subscriptionControllers.getUserSubscription(req, params);
