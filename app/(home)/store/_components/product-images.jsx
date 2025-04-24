"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import ImageViewer from "@/components/image/image-viewer";

const ProductImages = ({ singleProduct }) => {
  const [selectedImage, setSelectedImage] = useState(
    singleProduct.product_images[0].public_url
  );

  return (
    <div className="w-full flex flex-col-reverse md:flex-row md:gap-2">
      <ScrollArea className="w-full  md:w-[100px] p-2 ">
        <div className="flex flex-row md:flex-col md:gap-2 ">
          {singleProduct.product_images.map((img, i) => (
            <figure key={i} className="shrink-0 cursor-pointer ">
              <div
                onClick={() => setSelectedImage(img.public_url)}
                className="border border-transparent hover:border-[rgba(0,0,0,0.1)] md:mr-2 mb-2"
              >
                <Image
                  src={img.public_url}
                  alt="product thumbnail"
                  className="w-[60px] h-[60px] md:h-[80px] md:w-[80px] object-contain md:object-cover md:p-2 "
                  width={300}
                  height={300}
                />
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="md:hidden" />
        <ScrollBar orientation="vertical" className="hidden md:block" />
      </ScrollArea>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-[340px] h-[440px] flex items-center justify-center"
          >
            <ImageViewer
              src={selectedImage}
              alt="Selected Product"
              className="object-contain h-[400px] w-[340px]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductImages;
