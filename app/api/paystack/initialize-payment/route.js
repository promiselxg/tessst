import { subscriptionControllers } from "@/controller/subscription/subscriptionController";

export const POST = async (req) =>
  subscriptionControllers.initializeSubscription(req);
