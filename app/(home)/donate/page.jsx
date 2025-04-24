import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import DonationCard from "@/components/card/donate-card";
import Container from "@/components/container/container";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import React from "react";

const page = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Donations"
        pathname={[{ label: "Donate", href: "/donate" }]}
        banner="/img/bg.png"
      />
      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto">
            <h1
              className={cn(
                `${big_sholders_text.className} text-center text-[25px] md:text-[40px] md:text-start font-[700] mb-10`
              )}
            >
              What&apos;s Popular
            </h1>
          </Container>
          <Container className="w-[90%] md:w-[1100px] mx-auto">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              <DonationCard
                id="11111"
                title="8 Year Old Cancer Warrior"
                image="/img/image1.png"
                description="Meet our brave little heroine, an 8-year-old girl who's fighting for her life at the Federal Medical Center, Abuja."
                by="YSFON"
                target={200000}
                raised={10000}
                daysLeft={33}
                progress={50}
              />
              <DonationCard
                id="11111"
                title="donatePool - Education"
                image="/img/project1.png"
                description="This donation pool is created to help raise funds to support food drives campaigns to"
                by="YSFON"
                target={100000}
                raised={50500}
                daysLeft={33}
                progress={33}
              />
              <DonationCard
                id="11111"
                title="Medical Support for Nigerians."
                image="/img/image2.png"
                description="The children in Makoko floating slum need a new school that can accommodate 400"
                by="YSFON"
                target={1000000}
                raised={80000}
                daysLeft={33}
                progress={80}
              />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
