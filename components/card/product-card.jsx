"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { cn } from "@/lib/utils";

export const ProductCard = ({ product, view = "grid" }) => {
  const router = useRouter();
  const { addToCart, cart, loadingProductId, decreaseQuantity } =
    useCartStore();
  const isLoading = loadingProductId === product.id;

  const handleAdd = () => addToCart(product);
  const handleNavigate = () => router.push(`/store/${product.id}`);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const controlOpacityClass = cartItem
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";

  const isGrid = view === "grid";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "relative group rounded-xl bg-green-50 overflow-hidden",
        isGrid ? "p-4" : "flex gap-4 p-4 items-center"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl cursor-pointer",
          isGrid ? "w-full h-40 md:h-44" : "w-[120px] h-[120px] flex-shrink-0"
        )}
        onClick={handleNavigate}
      >
        <Image
          src={product?.product_main_image[0]?.public_url}
          alt={product?.name}
          fill={isGrid ? false : true}
          width={isGrid ? 114 : undefined}
          height={isGrid ? 114 : undefined}
          className={cn(
            "object-contain",
            isGrid ? "mx-auto" : "absolute inset-0 w-full h-full"
          )}
          priority
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-20" />
        )}
      </div>

      <div className={cn(isGrid ? "text-center" : "flex-1")}>
        <h3
          className={cn(
            "font-euclid font-semibold line-clamp-1",
            !isGrid && "text-left"
          )}
        >
          {product?.name}
        </h3>
        <p className="font-euclid text-gray-500 text-sm font-[600]">
          {formatCurrency(product.price)}
        </p>

        <div
          className={`w-full mt-3 transition-all duration-500 ${
            isGrid ? "my-3" : "mt-2"
          } ${controlOpacityClass}`}
        >
          {cartItem ? (
            <div
              className={cn(
                "w-full flex justify-between items-center",
                !isGrid && "md:w-[150px]"
              )}
            >
              <Button
                size="icon"
                className="rounded-[3px] bg-[--app-primary-color] hover:bg-[--app-primary-color]"
                disabled={isLoading}
                onClick={() => decreaseQuantity(product?.id)}
              >
                <Minus />
              </Button>

              {isLoading ? (
                <Loader2 className="animate-spin text-muted-foreground" />
              ) : (
                <div className="font-semibold">{quantity}</div>
              )}

              <Button
                size="icon"
                className="rounded-[3px] bg-[--app-primary-color] hover:bg-[--app-primary-color]"
                disabled={isLoading}
                onClick={handleAdd}
              >
                <Plus />
              </Button>
            </div>
          ) : isLoading ? (
            <div className="w-full flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <Button
              className={cn(
                "w-full bg-[--app-primary-color] hover:bg-[--app-primary-color]",
                !isGrid && "w-fit"
              )}
              onClick={handleAdd}
              disabled={isLoading}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
