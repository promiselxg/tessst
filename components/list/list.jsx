"use client";
import { motion } from "framer-motion";

const listContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const List = ({ items }) => {
  return (
    <div className="w-full flex justify-center">
      <motion.ul
        className="w-full list-disc pl-6 space-y-4 text-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={listContainer}
      >
        {items.map((item, index) => (
          <motion.li key={index} variants={listItem}>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default List;
