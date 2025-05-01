import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      loading: false,
      loadingProductId: null,

      // Add to cart or increase quantity
      addToCart: (product) => {
        set({ loading: true, loadingProductId: product.id });

        setTimeout(() => {
          const { cart } = get();
          const itemExist = cart.find((item) => item.id === product.id);

          if (itemExist) {
            if (itemExist.quantity >= product.stock) {
              toast.error(`Only ${product.quantity} of this item is in stock.`);
              set({ loading: false, loadingProductId: null });
              return;
            }
            set({
              cart: cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              loading: false,
              loadingProductId: null,
            });
          } else {
            set({
              cart: [...cart, { ...product, quantity: 1 }],
              loading: false,
              loadingProductId: null,
            });
          }

          toast.success(`${product.name} added to cart.`);
        }, 1000);
      },

      // Decrease quantity
      decreaseQuantity: (id) => {
        const { cart } = get();
        const item = cart.find((item) => item.id === id);

        if (!item) return;

        if (item.quantity > 1) {
          set({
            cart: cart.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          set({
            cart: cart.filter((i) => i.id !== id),
          });
        }

        toast.success("Item quantity updated.");
      },
      // Remove item from cart
      removeFromCart: (id) => {
        const { cart } = get();
        set({
          cart: cart.filter((item) => item.id !== id),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
