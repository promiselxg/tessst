"use client";
import { useCartStore } from "@/store/cartStore";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const QuantityController = ({
  quantity,
  onIncrease,
  onDecrease,
  productId,
}) => {
  const { cart, loadingProductId } = useCartStore();

  const item = cart.find((item) => item.id === productId);

  const isDisabled = item?.quantity < 2;

  const isLoading = loadingProductId === productId;

  return (
    <div className="flex items-center gap-4">
      <Button
        size="icon"
        onClick={onDecrease}
        disabled={isLoading || isDisabled}
        className={`px-2 py-1 rounded text-white w-8 h-7 ${
          isDisabled ? "bg-gray-300" : "bg-[--app-primary-color] "
        }`}
      >
        -
      </Button>

      <div className="font-[600]">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-red-300" />
        ) : (
          quantity
        )}
      </div>

      <Button
        size="icon"
        disabled={isLoading}
        onClick={onIncrease}
        className="bg-[--app-primary-color] px-2 py-1 rounded text-white w-8 h-7"
      >
        +
      </Button>
    </div>
  );
};

export default QuantityController;
