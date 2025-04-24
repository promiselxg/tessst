import { cn } from "@/lib/utils";
import React from "react";
import { Counter } from "../animation/counter";

const StatCounter = ({ number, label, fontClassName }) => {
  return (
    <div className="text-center flex flex-col justify-center">
      <h1
        className={cn(
          fontClassName,
          "text-[120px] font-[700] text-[#ddd] leading-[120px]"
        )}
      >
        <Counter targetNumber={number} suffix="" duration={4000} />
      </h1>
      <p className="text-[20px] md:text-sm text-slate-700 font-euclid">
        {label}
      </p>
    </div>
  );
};

export default StatCounter;
