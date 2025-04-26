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
      <Progress variant={variant} value={value} />
      <p
        className={cn(
          "font-medium mt-2",
          colorVariant[variant || "default"],
          sizeVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </>
  );
};

export default CourseProgress;
