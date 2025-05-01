"use client";

import { Minus, Plus, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export const ProductQtyBtnAction = ({ product }) => {
  const { cart, addToCart, removeFromCart, loadingProductId } = useCartStore();

  const isExisting = cart.find((item) => item.id === product.id);
  const isLoading = loadingProductId === product.id;

  return (
    <>
      {!isExisting && (
        <Button
          className="w-full h-10 bg-[--app-primary-color]"
          onClick={() => addToCart(product)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <>
              <ShoppingCart />
              Add to cart
            </>
          )}
        </Button>
      )}
      {isExisting && (
        <div className="flex items-center gap-5 mb-5">
          <Button
            size="icon"
            onClick={() => removeFromCart(product.id)}
            disabled={isLoading}
            className="bg-[--app-primary-color] shadow-md text-white rounded-[5px]"
          >
            <Minus />
          </Button>
          <span>
            {isLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <p className="text-[16px] font-[600]">{isExisting.quantity} </p>
            )}
          </span>
          <Button
            size="icon"
            onClick={() => addToCart(product)}
            disabled={isLoading}
            className="bg-[--app-primary-color] shadow-md text-white rounded-[5px]"
          >
            <Plus className="w-7 h-7" />
          </Button>{" "}
          <span className="text-[--app-primary-color] text-sm">
            ({isExisting?.quantity} item(s) added)
          </span>
        </div>
      )}
    </>
  );
};
