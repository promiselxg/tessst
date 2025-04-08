import AnimatedText from "@/components/animation/animatedText";
import ImageFadeIn from "@/components/animation/imageFadeIn";
import Reveal from "@/components/animation/reveal";
import TextFadeIn from "@/components/animation/textFadeIn";
import { CardSlider } from "@/components/slider/card-slider";
import { Button } from "@/components/ui/button";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const HomePartnerSection = () => {
  return (
    <div className="w-[90%] mx-auto md:w-full min-h-[calc(100vh-85px)] py-[80px] md:pt-[85px] relative">
      <div className="w-full flex">
        <div className="md:container mx-auto w-[80%] md:w-[1300px]">
          <div className="flex items-center text-center justify-center">
            <h1
              className={cn(
                `${big_sholders_text.className} text-[30px] md:text-[42px] font-[400]`
              )}
            >
              Our Partners and Sponsors
            </h1>
          </div>
          <div className="w-full mt-10">
            <CardSlider />
          </div>
          <Reveal direction="right" delay={0.8}>
            <div className="md:w-[1000px] w-full mx-auto md:pt-20 flex gap-10">
              <div className="md:flex gap-8 w-[65%] justify-center hidden">
                <ImageFadeIn
                  src="/img/image1.png"
                  alt="company logo"
                  height={250}
                  width={250}
                  className="flex items-center justify-center w-[250px]"
                />
                <ImageFadeIn
                  src="/img/image2.png"
                  alt="company logo"
                  height={250}
                  width={250}
                  className="flex items-center justify-center w-[250px]"
                />
              </div>
              <div className="w-full md:w-[45%] py-10">
                <h1
                  className={cn(
                    `${big_sholders_text.className} font-[700] text-[30px] leading-tight`
                  )}
                >
                  <TextFadeIn>Stand with us for a brighter future.</TextFadeIn>
                </h1>
                <TextFadeIn>
                  <p className=" font-euclid py-2 text-sm">
                    Donec aliquam ultrices purus, nec laoreet elit scelerisque.
                    Integer eget nisi ultrices, hendrerit urna at, pulvinar
                    diam. Donec sit amet facilisis dolor nunc eget purus
                  </p>
                </TextFadeIn>
                <div className="flex items-center gap-4 py-1 text-sm">
                  <span>
                    <ImageFadeIn
                      src="/img/checkbox.png"
                      alt="checkbox"
                      width={50}
                      height={50}
                      className="h-4 w-4"
                    />
                  </span>
                  <AnimatedText text="Lorem ipsum dolor sit amet" />
                </div>
                <div className="flex items-center gap-4 py-1 text-sm">
                  <span>
                    <ImageFadeIn
                      src="/img/checkbox.png"
                      alt="checkbox"
                      width={50}
                      height={50}
                      className="h-4 w-4"
                    />
                  </span>
                  <AnimatedText text="Lorem ipsum dolor sit amet" />
                </div>
                <div className="flex items-center gap-4 py-1 text-sm">
                  <span>
                    <ImageFadeIn
                      src="/img/checkbox.png"
                      alt="checkbox"
                      width={50}
                      height={50}
                      className="h-4 w-4"
                    />
                  </span>
                  <AnimatedText text="Lorem ipsum dolor sit amet" />
                </div>
                <div className="w-full relative top-[20px] md:top-[40px]">
                  <Button variant="outline" className="px-10 h-[50px]">
                    About us
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default HomePartnerSection;
