"use client";

import { motion } from "framer-motion";

export default function StateSelector({ states, onSelect, selected }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {states.map((state) => {
        const isSelected = selected === state;
        return (
          <motion.button
            key={state}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isSelected ? "#3B82F6" : "#fff",
              color: isSelected ? "#fff" : "#000",
            }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelect(state)}
            className="px-4 py-2 border rounded"
          >
            {state}
          </motion.button>
        );
      })}
    </div>
  );
}
