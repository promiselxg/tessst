"use server";

import prisma from "@/lib/utils/dbConnect";
import { toKobo } from "@/lib/paystack/toKobo";
import { createPendingOrder } from "./order";
import { createOrUpdateCustomerInfo } from "../customer/customer";
import { createOrderItem } from "./order-item";
import { updateProductStockQty } from "../product/update-product-qty";
import { createPayment } from "../payment/payment";
import { generateOrderInvoice } from "./generate-order-invoice";
import { createShippingLog } from "../log/shipping-log";
import { retryOperation } from "@/lib/retry/retry-operation";

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

    let pendingOrder;

    await prisma.$transaction(
      async (tx) => {
        // 1. Create pending order
        pendingOrder = await createPendingOrder({
          tx,
          amount: toKobo(total),
          email: user.email,
          customerId: user.id,
          metadata,
          delivery_fee: toKobo(delivery_fee),
          order_Id,
        });

        // 2. Create or update customer
        await createOrUpdateCustomerInfo(
          tx,
          {
            first_name: selectedCustomerAddress?.firstName,
            last_name: selectedCustomerAddress?.lastName,
            userId: user.id,
            email: user.email,
          },
          user.id
        );

        // 3. Create order items and update stock
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

          await updateProductStockQty(tx, item.id, item.quantity);
        }

        // 4. Create payment
        await createPayment(tx, pendingOrder.id, user.id, toKobo(total));

        await createShippingLog({
          orderId: pendingOrder.id,
          status: "Order Created",
          note: "Order successfully placed",
        });
      },
      { timeout: 15000 }
    );

    // background post-processing
    (async () => {
      try {
        await Promise.all([
          // Retry invoice generation if it fails
          retryOperation(
            () => generateOrderInvoice(pendingOrder.id, user.id),
            3,
            1000
          ),
        ]);
      } catch (err) {
        console.error("Post-order task failed after retries", err);
      }
    })();

    return {
      success: true,
      orderId: pendingOrder.order_Id,
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Order creation failed" };
  }
}
