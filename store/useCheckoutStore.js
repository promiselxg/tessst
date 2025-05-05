import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCheckoutStore = create(
  persist(
    (set) => ({
      customerAddress: [],
      selectedDeliveryAddress: null,
      selectedCustomerAddress: null,
      selectedPaymenthMethod: null,

      setselectedDeliveryAddress: (address) =>
        set({
          selectedDeliveryAddress: address,
        }),
      setSelectedPaymentMethod: (paymentMethod) =>
        set({
          selectedPaymenthMethod: paymentMethod,
        }),

      setselectedCustomerAddress: (address) =>
        set({
          selectedCustomerAddress: address,
        }),

      addCustomerAddress: (newAddress) =>
        set((state) => ({
          customerAddress: [...state.customerAddress, newAddress],
        })),

      editCustomerAddress: (updatedAddress) =>
        set((state) => ({
          customerAddress: state.customerAddress.map((a) =>
            a.id === updatedAddress.id ? updatedAddress : a
          ),
        })),

      resetCheckout: () =>
        set({
          customerAddress: [],
          selectedDeliveryAddress: null,
          selectedCustomerAddress: null,
          selectedPaymenthMethod: null,
        }),
    }),
    {
      name: "customer-checkout-info",
      getStorage: () => localStorage,
    }
  )
);
