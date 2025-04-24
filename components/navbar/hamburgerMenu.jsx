"use client";

import { motion } from "framer-motion";

export default function HamburgerMenu({ isOpen, toggle }) {
  return (
    <button onClick={toggle} className="flex flex-col gap-1 z-50">
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
        className="w-6 h-0.5 bg-black"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1 }}
        className="w-6 h-0.5 bg-black"
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
        className="w-6 h-0.5 bg-black"
      />
    </button>
  );
}
