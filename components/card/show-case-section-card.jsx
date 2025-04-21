import React from "react";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import TextFadeIn from "../animation/textFadeIn";
import AnimatedText from "../animation/animatedText";
import Reveal from "../animation/reveal";

const ShowcaseSection = ({
  mainImage,
  overlayImage,
  title,
  text,
  subheading,
  row = false,
  items = [],
}) => {
  return (
    <section
      className={cn(
        `${
          row ? "md:flex-row-reverse " : "md:flex-row "
        } flex flex-col items-center gap-12 md:py-12 px-6 md:px-16`
      )}
    >
      <div
        className={cn(
          `${
            row ? "md:w-[40%]" : "md:w-[40%]"
          } relative w-full flex justify-left`
        )}
      >
        <Reveal>
          <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={mainImage}
              alt="Main"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute right-5 bottom-5 md:bottom-10 md:left-44 md:w-[200px] md:h-[200px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src={overlayImage}
              alt="Overlay"
              width={200}
              height={200}
              className="md:w-full md:h-full object-cover h-[120px] w-[120px] bg-no-repeat"
            />
          </div>
        </Reveal>
      </div>
      <div className={cn(`${row ? " md:w-[60%]" : "md:w-[60%]"} w-full`)}>
        <h2 className="text-3xl font-bold mb-4">
          <AnimatedText text={title} />
        </h2>
        <span className="text-gray-600 mb-6">
          <TextFadeIn>{text}</TextFadeIn>
        </span>
        <div>
          <h3 className="font-semibold mb-4 font-euclid">
            <TextFadeIn>{subheading}</TextFadeIn>
          </h3>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <TextFadeIn key={index}>
                <li className="flex items-start gap-2">
                  <CheckCheck className="text-black mt-1" />
                  <span className="text-gray-800">{item}</span>
                </li>
              </TextFadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
