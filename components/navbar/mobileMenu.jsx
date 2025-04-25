"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  courseId,
  navLinks,
  courseLinks,
}) {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              courseLinks ? "border border-slate-600 pt-10 " : "p-6 w-64",
              "fixed top-0 left-0  h-full bg-white z-50 shadow-lg"
            )}
          >
            <ScrollArea className="h-full">
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
                className={cn(
                  "flex flex-col  space-y-4",
                  courseLinks && "space-y-0"
                )}
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className={cn(
                      "text-lg cursor-pointer hover:text-blue-600 transition-colors",
                      courseLinks &&
                        "leading-tight h-12 flex items-center px-4 border-y-[1px] border-slate-100 hover:bg-slate-300/20"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {courseLinks ? (
                      <button
                        onClick={() =>
                          router.push(
                            `/training/${courseId}/chapters/${link.id}`
                          )
                        }
                        type="button"
                        className={cn(
                          "flex items-center text-slate-500 text-sm font-[400] transition-all cursor-pointer"
                        )}
                      >
                        <PlayCircle className="w-5 h-5 inline-block mr-2" />
                        {link.title}
                      </button>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
