"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ListWithIcon = ({ items }) => {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="p-6 bg-white rounded-xl shadow border flex gap-4 items-start"
          variants={itemVariants}
        >
          <div>
            {item.title && (
              <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-3 mb-2">
                <CheckCircle className="text-emerald-600 w-6 h-6 mt-1" />
                {item.title}
              </h3>
            )}
            <p className="text-sm text-slate-600 ml-9">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ListWithIcon;
