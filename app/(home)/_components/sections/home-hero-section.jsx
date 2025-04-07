import AnimatedText from "@/components/animation/animatedText";
import Reveal from "@/components/animation/reveal";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHeroSection = () => {
  return (
    <div className="relative w-full h-screen md:h-[calc(100vh-85px)] mt-[85px] bg-[url('/img/hero-bg.png')] bg-center bg-cover bg-no-repeat">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container mx-auto w-[90%] ms:w-[1300px] flex items-center h-full">
        <Reveal>
          <div className="flex flex-col text-white space-y-2">
            <h1
              className={cn(
                `${big_sholders_text.className} text-white text-[50px] md:text-[80px] font-[700] max-w-[20ch] leading-[1em] text`
              )}
            >
              Join a movement that drives real impact.
            </h1>

            <p className="font-euclid text-sm md:text-[16px] max-w-[40ch] md:max-w-[50ch] text-[rgba(255,255,255,0.8)]">
              Donec aliquam ultrices purus, nec laoreet elit scelerisque.
              Integer eget nisi ultrices, hendrerit urna at, pulvinar diam.
              Donec sit amet facilisis dolor nunc eget purus.
            </p>

            <div className="flex items-center gap-5 pt-5">
              <Link href="/" className="flex items-center gap-5">
                <Image
                  src="/img/play.png"
                  alt="video play button"
                  width={50}
                  height={50}
                  className=""
                />
                <h1
                  className={cn(
                    ` font-euclid text-[16px] font-[400] transition-all hover:text-[rgba(255,255,255,0.8)]`
                  )}
                >
                  <AnimatedText text="Watch video" />
                </h1>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default HomeHeroSection;
