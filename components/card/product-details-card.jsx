"use client";
import { ShoppingCart, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";

export const ProductDetailsCard = ({ product }) => {
  const { addToCart, loading } = useCartStore();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="w-full md:w-[90%] p-5">
      <div>
        <h1 className=" font-euclid text-[18px] md:text-[25px] font-[400] md:leading-tight">
          XIAOMI Redmi A3 Pro 6.88 4GB RAM / 128GB ROM Android 14 - Starry Blue
        </h1>
        <div className="flex items-center gap-2 text-xs my-2">
          <span>Brand:</span>
          <span>Xiaomi</span>
        </div>
      </div>
      <div className="w-full border-[rgba(0,0,0,0.1)] border-b-[1px] my-2" />
      <div className="flex flex-col gap-2 mb-4">
        <p className="font-bold text-lg text-gray-800">
          ₦{product?.price?.toLocaleString()}
        </p>
        <p className="text-xs text-red-500 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" /> {product.stock} units left
        </p>
        {/* <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {[...Array(product.rating)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
          <span className="text-[--app-primary-color] text-xs">
            ({product?.reviews} ratings)
          </span>
        </div> */}
      </div>

      <Button
        className="w-full h-10 bg-[--app-primary-color]"
        onClick={() => handleAddToCart(product)}
        disabled={loading}
      >
        {loading ? (
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
    </div>
  );
};
