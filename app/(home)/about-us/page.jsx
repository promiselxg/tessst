import SectionWrapper from "@/components/animation/sectionWrapper";
import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import ShowcaseSection from "@/components/card/show-case-section-card";
import Container from "@/components/container/container";
import StatCounter from "@/components/counter/stats-counter";
import { big_sholders_text } from "@/lib/fonts";
import React from "react";
import HomeTeamSection from "../_components/sections/home-team-section";
import HomePartnerSection from "../_components/sections/home-partner-section";

const page = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Blog"
        pathname={[{ label: "Who We Are", href: "/about-us" }]}
        banner="/img/bg.png"
        description="Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisi ultrices, hendrerit urna at, pulvinar diam. Donec sit amet  facilisis dolor nunc eget purusisque. "
      />
      <div className="w-full flex h-fit md:min-h-screen flex-col">
        <div className="flex flex-col w-full mx-auto bg-[#eee] md:h-[350px] h-fit">
          <Container className="w-[90%] md:w-[1000px]">
            <div className="py-20">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCounter
                  number="115"
                  label="Projects Completed"
                  fontClassName={big_sholders_text.className}
                />
                <StatCounter
                  number="1001"
                  label="People Reached"
                  fontClassName={big_sholders_text.className}
                />
                <StatCounter
                  number="1"
                  label="Less Than a Year of Impact"
                  fontClassName={big_sholders_text.className}
                />
              </div>
            </div>
          </Container>
        </div>
        <div className="w-full">
          <Container className="w-[90%] md:w-[1100px]">
            <div className="py-20 space-y-6">
              <ShowcaseSection
                mainImage="/img/image1.png"
                overlayImage="/img/image1.png"
                title="Our Vision"
                text="To be the leading platform for youth sports development in Nigeria, nurturing future champions and role models through structured programs and initiatives"
                subheading="Our Goals:"
                items={[
                  "Ensure equal access to sports opportunities for all youth",
                  "Establish Nigeria as a global force in youth sports",
                  "Promote values of teamwork, resilience, and leadership among young athletes",
                ]}
              />
              <ShowcaseSection
                row
                mainImage="/img/image1.png"
                overlayImage="/img/image1.png"
                title="Our Mission"
                text="To empower Nigerian youth through sports by fostering talent, promoting discipline, and creating opportunities for personal and professional growth"
                subheading="Key Focus Areas:"
                items={[
                  "Developing grassroots sports programs across Nigeria",
                  "Providing mentorship and scholarship opportunities for young athletes",
                  "Collaborating with national and international organizations to enhance youth sports development",
                ]}
              />
              <ShowcaseSection
                mainImage="/img/image1.png"
                overlayImage="/img/image1.png"
                title="Our History"
                text="Founded in [Year], the Youth Sports Federation of Nigeria (YSFON) has played a pivotal role in discovering and developing young sports talent nationwide. Through various competitions, training camps, and mentorship programs, we have helped shape the careers of many professional athletes."
                subheading="Key Focus Areas:"
                items={[
                  "Over [X] years of commitment to youth sports development",
                  "Successful organization of national and regional youth sports tournaments",
                  "Partnerships with government bodies, sports academies, and corporate sponsors",
                ]}
              />
            </div>
          </Container>
        </div>
      </div>
      <SectionWrapper>
        <HomeTeamSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomePartnerSection showChild={false} />
      </SectionWrapper>
    </>
  );
};

export default page;
