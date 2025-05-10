"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const PrizeCard = ({ title, amount, perks, index }) => {
  const isGrand = title.toLowerCase() === "grand winner";

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className={`p-8  text-slate-800 shadow-md border border-[#eee] rounded-[8px] text-center flex flex-col items-center gap-4 transition-transform duration-300 ${
        isGrand ? "scale-105  bg-sky-950 text-white" : ""
      }`}
    >
      <div
        className={cn(
          "px-4 py-1 text-xs font-semibold rounded-md uppercase tracking-wide",
          isGrand && "bg-red-700 text-white"
        )}
      >
        {title}
      </div>

      <h2 className={`text-2xl font-bold `}>{amount}</h2>

      <ul className="mt-4 flex flex-col items-start gap-2">
        {perks.map((perk, idx) => (
          <li
            key={idx}
            className={cn(
              "flex items-center gap-2 text-sm",
              isGrand && "text-white"
            )}
          >
            <Plus className={`w-4 h-4`} />
            {perk}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PrizeCard;
