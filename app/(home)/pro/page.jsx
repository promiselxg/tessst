import Reveal from "@/components/animation/reveal";
import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import InfoCard from "@/components/card/info-card";
import PricingCard from "@/components/card/pricing-card";
import Container from "@/components/container/container";
import StatCounter from "@/components/counter/stats-counter";
import { big_sholders_text } from "@/lib/fonts";
import { Clock1, Flame, Users, VideoIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Membership"
        pathname={[{ label: "Membership", href: "/pro" }]}
        banner="/img/bg.png"
        description="Join our community of changemakers and gain access to exclusive
              resources, events, and opportunities. Together, we can make a
              difference."
      />
      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1000px] mx-auto justify-center items-center flex flex-col mb-10">
            <div className="w-full flex gap-10 md:flex-row flex-col">
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <Image
                  src="/img/users.webp"
                  alt="users"
                  width={500}
                  height={500}
                  priority
                  className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover overflow-clip"
                />
              </div>
              <div className="w-full md:w-1/2">
                <Reveal>
                  <div className="w-full flex flex-col items-center justify-center gap-4">
                    <InfoCard
                      icon={<VideoIcon />}
                      title="Access Every Course"
                      description="Get instant access to the entire YSFON course library. No ads. No interruptions."
                      highlights={["No ads", "No interruptions", "YSFON"]}
                    />
                    <InfoCard
                      icon={<Users />}
                      title="Exclusive Courses"
                      description="Pro members will gain access to exclusive courses, not available for regular members."
                    />
                    <InfoCard
                      icon={<Flame />}
                      title="Masterclass Courses"
                      description="Get instant access to the entire YSFON course library. No ads. No interruptions."
                      highlights={["No ads", "No interruptions"]}
                    />
                    <InfoCard
                      icon={<Clock1 />}
                      title="Early Access"
                      description="Be the first to watch new courses! All content is released to our Pro members first."
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
          <Container>
            <div className="w-full flex">
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <Reveal>
                  <div className="py-10">
                    <p className="text-center">Our Pricing Plans</p>
                    <h1 className="text-[30px] font-bold text-center">
                      Choose a Plan
                    </h1>
                  </div>
                </Reveal>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
                  <PricingCard
                    title="Freebie Plan"
                    price={0}
                    duration="/forever"
                    features={[
                      "Instant access to all courses",
                      "Early access to new courses",
                      "Access to premium & Udemy courses",
                      "Cancel at any time",
                    ]}
                    ctaText="Join Now"
                  />
                  <PricingCard
                    title="Monthly Subscription"
                    price={4999}
                    duration="/month"
                    features={[
                      "Instant access to all courses",
                      "Early access to new courses",
                      "Access to premium & Udemy courses",
                      "Cancel at any time",
                    ]}
                    badge="Most popular"
                    ctaText="Join Now"
                  />
                  <PricingCard
                    title="Yearly Subscription"
                    price={70000}
                    duration="/year"
                    features={[
                      "Instant access to all courses",
                      "Early access to new courses",
                      "Access to premium & Udemy courses",
                      "Cancel at any time",
                    ]}
                    ctaText="Join Now"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="flex flex-col w-full mx-auto bg-[#eee] md:h-[350px] h-fit">
        <Container className="w-[90%] md:w-[1000px]">
          <div className="py-20">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCounter
                number="20"
                label="Total Courses"
                fontClassName={big_sholders_text.className}
              />
              <StatCounter
                number="200"
                label="Registered Students"
                fontClassName={big_sholders_text.className}
              />
              <StatCounter
                number="1500"
                label="Learning minutes"
                fontClassName={big_sholders_text.className}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default page;
