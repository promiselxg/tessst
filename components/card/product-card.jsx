"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Search } from "lucide-react";
import IconButton from "../ui/icon-button";

export const ProductCard = ({ product }) => {
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
          className="flex items-center justify-center w-full h-40 md:h-44 transform-gpu will-change-transform "
        >
          <Image
            src={product.image}
            alt={product.name}
            width={114}
            height={114}
            priority
            className="object-contain"
          />
        </motion.div>

        <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <IconButton icon={<ShoppingCart size={18} />} />
          <IconButton icon={<Search size={18} />} />
          <IconButton icon={<Heart size={18} />} />
        </div>
      </div>

      <div className="text-center mt-4">
        <h3 className="font-euclid font-semibold">{product.name}</h3>
        <p className="font-euclid text-gray-500 text-sm font-[600]">
          ₦{product?.price?.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};
