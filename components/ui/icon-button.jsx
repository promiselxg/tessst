"use client";

import { motion } from "framer-motion";

const IconButton = ({ icon }) => (
  <motion.button
    whileHover={{ scale: 1.2 }}
    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
  >
    {icon}
  </motion.button>
);

export default IconButton;
