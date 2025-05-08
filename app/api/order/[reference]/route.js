import { getOrderByReference } from "@/controller/order/orderController";

export const GET = async (req) => getOrderByReference.verifyOrder(req);
