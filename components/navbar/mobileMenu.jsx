"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MobileMenu({ isOpen, setIsOpen, navLinks }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-64 h-full bg-white z-50 p-6 shadow-lg"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
                hidden: {},
              }}
              className="flex flex-col space-y-6"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="text-lg cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={link.href} legacyBehavior>
                    <a>{link.label}</a>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
