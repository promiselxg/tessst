"use server";

import { toKobo } from "@/lib/paystack/toKobo";
import { createPendingOrder } from "./order";
import { createOrUpdateCustomerInfo } from "../customer/customer";
import { createOrderItem } from "./order-item";
import { updateProductStockQty } from "../product/update-product-qty";
import { createPayment } from "../payment/payment";
import prisma from "@/lib/utils/dbConnect";

export async function createOrder({
  cart,
  user,
  total,
  delivery_fee,
  selectedCustomerAddress,
  selectedDeliveryAddress,
  order_Id,
}) {
  try {
    const metadata = {
      delivery_address: `${selectedDeliveryAddress.name} - ${selectedDeliveryAddress.delivery_address}`,
      city: selectedCustomerAddress.city,
      state: selectedCustomerAddress.state,
      postalCode: selectedCustomerAddress?.postalCode,
    };

    return await prisma.$transaction(
      async (tx) => {
        // 1. Create pending order
        const pendingOrder = await createPendingOrder({
          tx,
          amount: toKobo(total),
          email: user.email,
          customerId: user.id,
          metadata,
          delivery_fee: toKobo(delivery_fee),
          order_Id,
        });
        // 2. Create or update customer
        const customerData = {
          first_name: selectedCustomerAddress?.firstName,
          last_name: selectedCustomerAddress?.lastName,
          userId: user.id,
          email: user.email,
        };

        await createOrUpdateCustomerInfo(tx, customerData, user.id);

        // 3. Create order items and variants
        for (const item of cart) {
          await createOrderItem({
            tx,
            orderId: pendingOrder.id,
            productId: item.id,
            quantity: item.quantity,
            price: toKobo(item.price),
            subtotal: toKobo(total),
            productVariants: item.product_variants || [],
          });

          // 4. Update stock using shared function
          await updateProductStockQty(tx, item.id, item.quantity);
        }

        // 5. Create payment
        await createPayment(tx, pendingOrder.id, user.id, toKobo(total));
        return {
          success: true,
          orderId: pendingOrder.order_Id,
        };
      },
      { timeout: 15000 }
    );
  } catch (error) {
    console.error("Order creation failed:", error);
    return { success: false, error: "Order creation failed" };
  }
}
