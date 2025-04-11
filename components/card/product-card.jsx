"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Search, Loader2 } from "lucide-react";
import IconButton from "../ui/icon-button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart, loadingProductId } = useCartStore();
  const isLoading = loadingProductId === product.id;

  const handleAdd = () => addToCart(product);
  const handleNavigate = () => router.push(`/store/${product.slug}`);

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

        <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <IconButton icon={<ShoppingCart size={18} />} onClick={handleAdd} />
          <IconButton icon={<Search size={18} />} />
          <IconButton icon={<Heart size={18} />} />
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-20">
            <Loader2 className="animate-spin text-[--app-bg-red]" />
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <h3 className="font-euclid font-semibold">{product?.name}</h3>
        <p className="font-euclid text-gray-500 text-sm font-[600]">
          &#8358;{product?.price?.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};
