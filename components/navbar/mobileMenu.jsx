"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { useState } from "react";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  courseId,
  navLinks,
  courseLinks,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isParentLinkActive = (linkHref) => {
    return (
      ["/store", "/projects", "/training", "/subscription"].some(
        (path) => linkHref === path && pathname.startsWith(path)
      ) || pathname === linkHref
    );
  };

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
              courseLinks
                ? "border border-slate-600 pt-10 w-[80%]"
                : "p-6 w-64",
              "fixed top-0 left-0 h-full bg-white z-50 shadow-lg"
            )}
          >
            <ScrollArea className="h-full">
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {},
                }}
                className={cn(
                  "flex flex-col space-y-4",
                  courseLinks && "space-y-0"
                )}
              >
                {navLinks.map((link, i) => {
                  const isActive = isParentLinkActive(link.href);
                  const hasChildren = link.children?.length > 0;
                  const isDropdownOpen = openDropdown === link.label;

                  return (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="text-lg"
                    >
                      {courseLinks ? (
                        <button
                          onClick={() =>
                            router.push(
                              `/training/${courseId}/chapters/${link.id}`
                            )
                          }
                          type="button"
                          className="flex items-center text-slate-500 text-sm font-[400]"
                        >
                          <PlayCircle className="w-5 h-5 inline-block mr-2" />
                          {link.title}
                        </button>
                      ) : hasChildren ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(link.label)}
                            className={cn(
                              "flex justify-between w-full text-left text-gray-700 text-base font-medium",
                              isActive && "text-[--app-bg-red]"
                            )}
                          >
                            {link.label}
                            {isDropdownOpen ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          <div
                            className={cn(
                              "mt-2 ml-4 border-l pl-3 border-gray-200 space-y-2",
                              !isDropdownOpen && "hidden"
                            )}
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-sm text-gray-600 hover:text-[--app-primary-color]"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className={cn(
                            "block text-gray-700 text-base font-medium",
                            isActive && "text-[--app-bg-red]"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
