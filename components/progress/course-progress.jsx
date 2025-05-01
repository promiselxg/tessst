import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import React from "react";

const sizeVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const colorVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const CourseProgress = ({ variant, value, size = "default" }) => {
  return (
    <>
      <Progress variant={variant} value={value} className="h-[2px]" />
      <div
        className={cn(
          "font-medium mt-2",
          colorVariant[variant || "default"],
          sizeVariant[size || "default"]
        )}
      >
        <div className="text-xs text-muted-foreground">
          {value !== 0 ? `${Math.round(value)}% Complete` : "Start course"}
        </div>
      </div>
    </>
  );
};

export default CourseProgress;
