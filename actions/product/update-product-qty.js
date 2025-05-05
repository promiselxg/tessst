"use server";
export async function updateProductStockQty(tx, productId, quantity) {
  return tx.product.update({
    where: { id: productId },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  });
}
