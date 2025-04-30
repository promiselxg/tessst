import ImageFadeIn from "@/components/animation/imageFadeIn";
import TextFadeIn from "@/components/animation/textFadeIn";
import { BreadcrumbNav } from "@/components/breadcrumb/breadcrumb";
import Container from "@/components/container/container";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

import DonateUserInfo from "./_component/donate-user-info";

const page = ({ params }) => {
  return (
    <>
      <div className="w-full flex h-fit py-[40px] md:py-[85px] bg-[whitesmoke]">
        <div className="flex flex-col w-full mx-auto">
          <div className="py-5 bg-neutral-900 mt-[45px] md:mt-0">
            <Container className="w-[90%] md:w-[1300px] mx-auto">
              <BreadcrumbNav
                prev={{ label: "Donations", href: "/donate" }}
                slug={params.id}
                className="text-[whitesmoke]"
              />
            </Container>
          </div>
          <Container className="w-[90%] md:w-[1300px] mx-auto">
            <div className="w-full flex mt-10 flex-col">
              <div className="flex flex-col justify-center text-center mb-5">
                <h1 className="text-md md:text-[30px]">donatePool - feeding</h1>
                <p className="text-sm md:text-md">by YSFON</p>
              </div>
              <div className="w-full flex gap-10 flex-col md:flex-row">
                <div className="w-full md:w-[70%]">
                  <Image
                    src="/img/hero-bg.png"
                    alt="donation"
                    width={1000}
                    height={700}
                    priority
                    className="w-full h-[300px] md:h-[600px] object-cover"
                  />
                  <TextFadeIn className="py-3 text-sm text-slate-700">
                    This donation pool is created to help raise funds to support
                    food drives campaigns to individuals finding it challenging
                    to feed in current day Nigeria. Impact of donation would be
                    communicated quarterly to regularly donors.
                  </TextFadeIn>
                </div>
                <div className="w-full md:w-[30%]  bg-sky-100 h-fit space-y-3 p-2">
                  <div className="bg-white p-5 shadow-md rounded-[5px]">
                    <h1 className="text-[20px] font-bold pb-1">1,763,614.04</h1>
                    <p className="text-sm pb-2">
                      Raised by <span className="font-[600]">200 people</span>
                    </p>
                    <Progress value={45} className="w-full" />
                    <div className="flex justify-between gap-4 text-center mt-2">
                      <div className="flex flex-col items-center">
                        <span className="text-sm md:font-semibold">
                          &#8358;10000
                        </span>
                        <span className="text-sm text-gray-500">Target</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm md:font-semibold">
                          &#8358;10000
                        </span>
                        <span className="text-sm text-gray-500">Raised</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm md:font-semibold">30</span>
                        <span className="text-sm text-gray-500">Days Left</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-5 shadow-md justify-center flex flex-col items-center rounded-[5px]">
                    <div className="w-full">
                      <DonateUserInfo productId={params.id} />
                    </div>
                    <ImageFadeIn
                      src="/img/payment_medias.png"
                      width={300}
                      height={50}
                      priority
                      alt="payment methods"
                      className="h-[50px] w-[200px] mt-2 mb-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
