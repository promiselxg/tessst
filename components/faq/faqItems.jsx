"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { big_sholders_text } from "@/lib/fonts";
import TextFadeIn from "../animation/textFadeIn";

const FaqItem = ({ number, question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-6">
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex gap-4">
          <span
            className={cn(
              `${big_sholders_text.className} text-gray-400 text-[20px] font-semibold`
            )}
          >
            {number}
          </span>
          <h4 className={cn(`font-euclid font-[400] text-sm md:text-[20px]`)}>
            <TextFadeIn>{question}</TextFadeIn>
          </h4>
        </div>
        <span className="text-xl">{open ? "×" : "+"}</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-10 pr-4 mt-4 text-slate-500 text-sm font-euclid"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;
