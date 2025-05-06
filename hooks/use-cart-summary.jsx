import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";

export const useCartSummary = () => {
  const { cart, clearCart } = useCartStore();
  const { selectedDeliveryAddress } = useCheckoutStore();
  let delivery_fee = 0;

  if (selectedDeliveryAddress) {
    delivery_fee = 1900;
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const invalidItems = cart.filter((item) => item.quantity < 1);
  const isValid = invalidItems.length === 0;

  const total = subtotal + delivery_fee;

  return {
    cart,
    subtotal,
    delivery_fee,
    total,
    isValid,
    invalidItems,
    clearCart,
  };
};
