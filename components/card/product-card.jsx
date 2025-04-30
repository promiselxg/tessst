"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Button } from "../ui/button";

export const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart, cart, loadingProductId, decreaseQuantity } =
    useCartStore();
  const isLoading = loadingProductId === product.id;

  const handleAdd = () => addToCart(product);
  const handleNavigate = () => router.push(`/store/${product.slug}`);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const controlOpacityClass = cartItem
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative group p-4 rounded-xl bg-green-50"
    >
      <div className="relative overflow-hidden rounded-xl cursor-pointer">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex items-center justify-center w-full h-40 md:h-44"
          onClick={handleNavigate}
        >
          <Image
            src={product?.image}
            alt={product?.name}
            width={114}
            height={114}
            priority
            className="object-contain"
          />
        </motion.div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-20" />
        )}
      </div>

      <div className="text-center">
        <h3 className="font-euclid font-semibold">{product?.name}</h3>
        <p className="font-euclid text-gray-500 text-sm font-[600]">
          &#8358;{product?.price?.toLocaleString()}
        </p>
      </div>
      <div
        className={`w-full my-3 transition-all duration-500 ${controlOpacityClass}`}
      >
        {cartItem ? (
          <div className="w-full flex justify-between items-center">
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
            className="w-full bg-[--app-primary-color] hover:bg-[--app-primary-color]"
            onClick={handleAdd}
            disabled={isLoading}
          >
            Add to cart
          </Button>
        )}
      </div>
    </motion.div>
  );
};
