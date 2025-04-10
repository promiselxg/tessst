import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      loading: false,

      // Simulate API call to add to cart with a delay of 3 seconds
      addToCart: (product) => {
        set({ loading: true }); // Set loading to true before simulating the API call

        // Simulating an API call with a 3-second delay
        setTimeout(() => {
          const existing = get().cart.find((item) => item.id === product.id);

          if (existing) {
            set({
              cart: get().cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              loading: false, // Set loading to false after processing
            });
            toast.success(`${product.name} added to cart successfully.`);
          } else {
            set({
              cart: [...get().cart, { ...product, quantity: 1 }],
              loading: false, // Set loading to false after processing
            });
            toast.success(`${product.name} added to cart successfully.`);
          }
        }, 3000); // Simulating a 3-second delay
      },

      // Remove item from cart
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },

      // Clear all items from the cart
      clearCart: () => set({ cart: [] }),

      // Get the total number of items in the cart
      getCartItemCount: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: "cart-storage", // This will persist your cart state in localStorage
    }
  )
);
