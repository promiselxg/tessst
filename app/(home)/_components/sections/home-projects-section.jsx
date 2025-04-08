import AnimatedText from "@/components/animation/animatedText";
import ImageFadeIn from "@/components/animation/imageFadeIn";
import Reveal from "@/components/animation/reveal";
import { Button } from "@/components/ui/button";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const HomeProjectSection = () => {
  return (
    <Reveal>
      <div className="w-full flex bg-[--app-bg-red] h-full md:min-h-screen py-[40px] md:pt-[85px]">
        <div className="container mx-auto w-[90%] md:w-[1200px]">
          <h1
            className={cn(
              `${big_sholders_text.className} font-[700] text-[40px] text-white mb-5 text-center md:text-left`
            )}
          >
            <AnimatedText text="Our Projects" />
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="">
              <Link href="/">
                <div className="w-full overflow-hidden h-[200px]">
                  <ImageFadeIn
                    src="/img/project1.png"
                    width={200}
                    height={200}
                    alt="display image"
                    className="bg-cover"
                  />
                </div>
                <div className="shadow bg-white p-5 h-[250px]">
                  <h1
                    className={cn(
                      `${big_sholders_text.className} text-[24px] font-[600]`
                    )}
                  >
                    Sports
                  </h1>
                  <p className=" font-euclid text-sm text-slate-700 mt-4">
                    Donec aliquam ultrices purus, nec laoreet elit scelerisque.
                    Integer eget nisi ultrices, hendrerit urna at, pulvinar
                    diam. Donec sit amet facilisis dolor nunc eget purus
                  </p>
                  <div className="mt-8">
                    <Button className="px-10 h-10 bg-transparent hover:bg-transparent text-[--app-primary-color] border-[1px] border-[rgba(0,0,0,0.2)]">
                      Learn more
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/">
                <div className="w-full overflow-hidden h-[200px]">
                  <ImageFadeIn
                    src="/img/project2.png"
                    width={200}
                    height={200}
                    alt="display image"
                    className="bg-cover"
                  />
                </div>
                <div className="shadow bg-white p-5 h-[250px]">
                  <h1
                    className={cn(
                      `${big_sholders_text.className} text-[24px] font-[600]`
                    )}
                  >
                    Youth Empowerment
                  </h1>
                  <p className=" font-euclid text-sm text-slate-700 mt-4">
                    Donec aliquam ultrices purus, nec laoreet elit scelerisque.
                    Integer eget nisi ultrices, hendrerit urna at, pulvinar
                    diam. Donec sit amet facilisis dolor nunc eget purus
                  </p>
                  <div className="mt-8">
                    <Button className="px-10 h-10 bg-transparent hover:bg-transparent text-[--app-primary-color] border-[1px] border-[rgba(0,0,0,0.2)]">
                      Learn more
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/">
                <div className="w-full overflow-hidden h-[200px]">
                  <ImageFadeIn
                    src="/img/project3.png"
                    width={200}
                    height={200}
                    alt="display image"
                    className="bg-cover"
                  />
                </div>
                <div className="shadow bg-white p-5 h-[250px]">
                  <h1
                    className={cn(
                      `${big_sholders_text.className} text-[24px] font-[600]`
                    )}
                  >
                    Agriculture
                  </h1>
                  <p className=" font-euclid text-sm text-slate-700 mt-4">
                    Donec aliquam ultrices purus, nec laoreet elit scelerisque.
                    Integer eget nisi ultrices, hendrerit urna at, pulvinar
                    diam. Donec sit amet facilisis dolor nunc eget purus
                  </p>
                  <div className="mt-8">
                    <Button className="px-10 h-10 bg-transparent hover:bg-transparent text-[--app-primary-color] border-[1px] border-[rgba(0,0,0,0.2)]">
                      Learn more
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default HomeProjectSection;
