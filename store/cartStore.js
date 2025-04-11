import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      loading: false,
      loadingProductId: null,

      addToCart: (product) => {
        set({ loading: true, loadingProductId: product.id });

        setTimeout(() => {
          const existing = get().cart.find((item) => item.id === product.id);

          if (existing) {
            set({
              cart: get().cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              loading: false,
              loadingProductId: null,
            });
            toast.success(`${product.name} added to cart successfully.`);
          } else {
            set({
              cart: [...get().cart, { ...product, quantity: 1 }],
              loading: false,
              loadingProductId: null,
            });
            toast.success(`${product.name} added to cart successfully.`);
          }
        }, 3000);
      },

      removeFromCart: (id) => {
        const existing = get().cart.find((item) => item.id === id);
        if (!existing) return;
        set({ loading: true });
        if (existing.quantity > 1) {
          set({
            cart: get().cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
            loading: false,
          });
          toast.success(`Item quantity has been updated`);
        } else {
          set({
            cart: get().cart.filter((item) => item.id !== id),
            loading: false,
          });
          toast.success(`Item quantity has been updated`);
        }
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
