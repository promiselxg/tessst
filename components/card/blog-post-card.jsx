"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogPostCard({
  title,
  description,
  image,
  link = "#",
  layout = "card",
  badge,
  buttons = [],
}) {
  const isRow = layout === "row";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "w-full group",
        isRow
          ? "flex flex-col md:flex-row gap-4"
          : "flex flex-col border border-[#eee] rounded-md overflow-hidden"
      )}
    >
      <div
        className={cn(isRow ? "md:w-1/3 w-full relative" : "w-full relative")}
      >
        <Image
          src={image}
          width={isRow ? 300 : 600}
          height={250}
          alt={title}
          priority
          className={cn(
            "object-cover h-[250px] object-center",
            isRow ? "w-full rounded-md" : "w-full"
          )}
        />
        {badge && isRow && (
          <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}
      </div>
      <div
        className={cn(
          isRow
            ? "md:w-[60%] w-full mt-2 relative "
            : "p-4 flex flex-col justify-between "
        )}
      >
        <div>
          <h1
            className={cn(
              "font-medium line-clamp-2 leading-tight",
              isRow ? "text-lg md:text-[30px] leading-tight" : "text-xl mb-2"
            )}
          >
            {title}
          </h1>
          <p className="text-sm text-slate-700 mt-3 mb-3 md:mb-0">
            {description}
          </p>
        </div>

        <div
          className={cn(
            isRow
              ? "  hidden  md:flex absolute bottom-10"
              : "mt-4 flex gap-3 flex-wrap"
          )}
        >
          {buttons.map((btn, index) => (
            <Link href={btn.href} key={index} passHref>
              <Button
                variant={btn.variant || "secondary"}
                className="text-sm font-normal rounded-md flex items-center hover:text-[--app-primary-color] transition-all"
              >
                {btn.label} <ChevronRight />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
