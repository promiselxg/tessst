import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageFadeIn from "../animation/imageFadeIn";

export function CardSlider() {
  return (
    <Carousel className="w-[90%] md:w-full">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full md:basis-[15%]">
            <Card className="flex items-center justify-center h-[95px] md:pt-5 rounded-none border-none">
              <CardContent className="flex items-center justify-center md:h-[100px] rounded-none ">
                <ImageFadeIn
                  src="/img/company.png"
                  alt="company logo"
                  height={80}
                  width={80}
                  className="flex items-center justify-center"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
