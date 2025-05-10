import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import ContestCard from "@/components/card/contest-card";
import Container from "@/components/container/container";
import React from "react";

const page = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Contest"
        pathname={[{ label: "Contest", href: "/contest" }]}
        banner="/img/video-bg.png"
        description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus"
      />
      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto justify-center items-center flex flex-col mb-10">
            <div className="w-full flex">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                <ContestCard
                  image="/img/contest/1.jpg"
                  title="Black And White Compositions"
                  startDate="15th April, 2025"
                  endDate="08th May, 2026"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur blanditiis quas id obcaecati, voluptas laborum assumenda harum iste nemo ad."
                  targetDate="2026-05-08"
                  url="/resources/contest/1111"
                />
                <ContestCard
                  image="/img/contest/2.jpg"
                  title="Black And White Compositions"
                  startDate="15th May, 2025"
                  endDate="08th June, 2025"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur blanditiis quas id obcaecati, voluptas laborum assumenda harum iste nemo ad."
                  targetDate="2025-06-08"
                  url="/resources/contest/1111"
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
