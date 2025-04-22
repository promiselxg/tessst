"use client";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

const PricingCard = ({
  title,
  price,
  duration = "/mo",
  features = [],
  ctaText = "Join Now",
  badge,
}) => {
  return (
    <div
      className={cn(
        `${
          badge ? "border-[4px] border-yellow-600 scale-105" : ""
        } relative bg-zinc-900 text-white p-6 rounded-lg max-w-sm text-center overflow-hidden`
      )}
    >
      {badge && (
        <div className="absolute top-0 right-0 bg-yellow-600 text-xs font-semibold px-4 py-2 rounded-bl-md text-white">
          {badge}
        </div>
      )}

      <div className="py-10">
        <h3
          className={cn(
            `${big_sholders_text.className} text-[30px] font-bold mb-2`
          )}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">only</p>
        <div
          className={cn(
            `${big_sholders_text.className} text-[50px] font-extrabold mb-1`
          )}
        >
          &#8358;{price.toLocaleString()}
        </div>
        <p className="text-sm text-gray-400 mb-4">{duration}</p>
      </div>

      <hr className="border-gray-700 my-4" />

      <ul className="space-y-3 text-sm text-gray-300 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Flame className="text-yellow-500 w-4 h-4" />
            {feature}
          </li>
        ))}
      </ul>

      <button className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md w-full transition-colors">
        {ctaText}
      </button>
    </div>
  );
};

export default PricingCard;
