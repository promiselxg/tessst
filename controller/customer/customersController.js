import { customMessage, ServerError } from "@/lib/utils/customMessage";
import { isValidUUID } from "@/lib/utils/validateUUID";

const getAllCustomers = async (req) => {
  const query = req.nextUrl.searchParams;

  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const offset = (page - 1) * limit;

  try {
    //  Fetch filtered products
    const customers = await prisma.customer.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        orders: true,
        payments: true,
        invoices: true,
        addresses: true,
      },
    });

    const customerOrderSummary = customers.map((customer) => {
      const totalOrders = customer.orders.length;

      const paidOrders = customer.orders.filter(
        (order) => order.paymentStatus === "PAID"
      );

      const cancelledOrders = customer.orders.filter(
        (order) => order.paymentStatus === "CANCELLED"
      );

      const totalPaidOrders = paidOrders.length;
      const totalCancelledOrders = cancelledOrders.length;

      const totalAmountPaid = paidOrders.reduce((sum, order) => {
        const amount = parseFloat(order.amount) || 0;
        return sum + amount;
      }, 0);

      return {
        customerId: customer.id,
        name: customer.name,
        email: customer.email,
        createdAt: customer.createdAt,
        phone: customer.phone,
        phone_format: customer.phone_format,
        totalOrders,
        totalPaidOrders,
        totalAmountPaid,
        totalCancelledOrders,
      };
    });
    return customMessage(
      "Customers retrieved successfully",
      { customerOrderSummary },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const getSingleCustomerInfo = async (_, params) => {
  try {
    const customerId = await params.customerId;

    if (!isValidUUID(customerId)) {
      return customMessage("Invalid ID", {}, 400);
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        orders: true,
        payments: true,
        refunds: true,
        invoices: true,
        addresses: true,
        productReviews: true,
      },
    });

    if (!customer) {
      return customMessage("Customer not found", {}, 404);
    }

    return customMessage("Customer retrieved successfully", { customer }, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

export const customerControllers = {
  getAllCustomers,
  getSingleCustomerInfo,
};
