"use client";

import Image from "next/image";
import { CalendarCheck2, CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "../timer/countdown";

const ContestCard = ({
  image,
  title,
  startDate,
  endDate,
  description,
  targetDate,
}) => {
  return (
    <div className="w-full">
      <div className="w-full flex">
        <Image
          src={image}
          alt="image contest"
          width={500}
          height={500}
          priority
          className="w-full h-[300px] md:h-[400px] object-cover overflow-clip"
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-4">
        <h1 className="text-[18px] md:text-2xl font-euclid font-[400]">
          {title}
        </h1>
        <div className="w-full flex gap-5 justify-between md:items-center flex-col md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Start:</span>
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <CalendarCheck2 className="w-4 h-4" />
              {startDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">End:</span>
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <CalendarX2 className="w-4 h-4" />
              {endDate}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 my-1">{description}</p>
        <div className="py-5">
          <CountdownTimer targetDate={targetDate} />
        </div>
        <Button className="bg-[--app-primary-color] text-white h-10 rounded-md hover:bg-[--app-primary-color] transition duration-300 ease-in-out w-full">
          Join now for free
        </Button>
      </div>
    </div>
  );
};

export default ContestCard;
