"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ImageFadeIn({
  src,
  alt,
  className = "",
  width,
  height,
  delay = 0.2,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
        {...props}
      />
    </motion.div>
  );
}
