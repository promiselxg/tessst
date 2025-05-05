"use server";

export const createOrderItem = async ({
  tx,
  orderId,
  productId,
  quantity,
  price,
  subtotal,
  productVariants,
}) => {
  try {
    const orderItem = await tx.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
        price: price / 100,
        subtotal: subtotal / 100,
      },
    });

    // Handle variants (if any)
    if (productVariants?.length) {
      await Promise.all(
        productVariants.map((variant) =>
          tx.orderItemVariant.create({
            data: {
              orderItemId: orderItem.id,
              variantId: variant.id,
            },
          })
        )
      );
    }

    return {
      ...orderItem,
      price: orderItem.price.toNumber(),
      subtotal: orderItem.subtotal.toNumber(),
    };
  } catch (error) {
    console.error("Error creating order item:", error);
    throw new Error("Could not create order item.");
  }
};
