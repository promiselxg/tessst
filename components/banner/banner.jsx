import React from "react";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva("text-center p-4 text-sm flex w-full items-center", {
  variants: {
    variant: {
      warning: "bg-yellow-200/80 text-primary border-yellow/30",
      success: "bg-emerald-700 border-emerald-800 text-secondary",
    },
  },
  defaultVariants: {
    variant: "warning",
  },
});

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};
const Banner = ({ label, variant }) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </div>
  );
};

export default Banner;
