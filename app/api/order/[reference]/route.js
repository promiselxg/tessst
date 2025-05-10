import { orderControllers } from "@/controller/order/orderController";

export const GET = async (req) => orderControllers.verifyOrder(req);
