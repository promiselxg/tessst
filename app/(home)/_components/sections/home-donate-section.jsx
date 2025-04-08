import ImageFadeIn from "@/components/animation/imageFadeIn";
import Reveal from "@/components/animation/reveal";
import TextFadeIn from "@/components/animation/textFadeIn";
import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const features = [
  { img: "/img/empower-money.png", text: "Monetary Fundraising" },
  { img: "/img/sports-icon.png", text: "Sport Kit Fundraising" },
  { img: "/img/kit_medical_icon.png", text: "Medication Support" },
  { img: "/img/flower.png", text: "Agricultural Support Kit" },
  { img: "/img/delivery-hand-package-icon.png", text: "Empowerment Program" },
];

const FeatureItem = ({ img, text }) => (
  <div className="flex items-center flex-col text-center justify-center space-y-4">
    <ImageFadeIn
      src={img}
      width={50}
      height={50}
      alt={text}
      className="w-10 h-10"
    />
    <p className="text-[12px] md:text-[16px] font-euclid font-[500]">{text}</p>
  </div>
);

const HomeDonateSection = () => {
  return (
    <Reveal>
      <div className="w-full flex max-h-screen pt-[40px] md:pt-[85px]">
        <Container>
          <TextFadeIn
            as="h1"
            className={cn(
              `${big_sholders_text.className} text-[30px] font-[400] md:font-[700] text-center md:text-left`
            )}
          >
            Every contribution counts
          </TextFadeIn>

          <TextFadeIn
            as="p"
            className="font-euclid text-sm text-slate-700 max-w-[60ch] text-center md:text-left"
          >
            Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer
            eget nisi ultrices, hendrerit urna at, pulvinar diam. Donecsit amet
            facilisis dolor nunc eget purus
          </TextFadeIn>

          <div className="w-full py-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {features?.map((item, idx) => (
                <FeatureItem key={idx} img={item.img} text={item.text} />
              ))}
            </div>
          </div>
          <div className="w-full py-8 flex flex-col justify-center items-center">
            <TextFadeIn
              as="h1"
              className={cn(
                `${big_sholders_text.className} text-[30px] md:text-[50px] font-[700] leading-[1.2em] justify-center text-center`
              )}
            >
              Every Naira matters: <br />
              invest in a brighter future.
            </TextFadeIn>
            <p className="text-sm text-slate-700 max-w-[70ch] text-center py-5">
              Donec aliquam ultrices purus, nec laoreet elit scelerisque.
              Integer eget nisi ultrices, hendrerit urna at, pulvinar diam.
              Donecsit amet facilisis dolor nunc eget purus
            </p>
            <Button className="bg-transparent shadow-none border border-red-900 text-[--app-bg-red] px-10 h-10 transition-all hover:text-red-900 hover:bg-transparent text-sm">
              Donate
            </Button>
          </div>
        </Container>
      </div>
    </Reveal>
  );
};

export default HomeDonateSection;
