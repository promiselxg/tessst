"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TeamMemberCard({
  name,
  title = "Member",
  imageUrl = "/img/image1.png",
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center border rounded-lg p-4 bg-white shadow"
    >
      <Image
        src={imageUrl}
        alt={name}
        className="w-16 h-16 rounded-full mb-2"
        width={200}
        height={200}
      />
      <p className="font-bold">{name}</p>
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex gap-2 mt-2">
        <Image
          src="/img/image2.png"
          className="w-4 h-4"
          alt="state-1"
          width={200}
          height={200}
        />
        <Image
          src="/img/image1.png"
          className="w-4 h-4"
          alt="state-2"
          width={200}
          height={200}
        />
        <Image
          src="/img/image2.png"
          className="w-4 h-4"
          alt="state-3"
          width={200}
          height={200}
        />
      </div>
    </motion.div>
  );
}
