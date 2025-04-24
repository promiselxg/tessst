import AnimatedText from "@/components/animation/animatedText";
import ImageFadeIn from "@/components/animation/imageFadeIn";
import Reveal from "@/components/animation/reveal";
import Container from "@/components/container/container";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const teamMembers = [
  { img: "/img/team/team1.png", name: "Monetary Fundraising", role: "CEO" },
  { img: "/img/team/team2.png", name: "Sport Kit Fundraising", role: "CEO" },
  { img: "/img/team/team3.png", name: "Medication Support", role: "CEO" },
  { img: "/img/team/team4.png", name: "Agricultural Support Kit", role: "CEO" },
  {
    img: "/img/team/team5.png",
    name: "Empowerment Program",
    role: "CEO",
  },
];

const HomeTeamSection = () => {
  return (
    <Reveal>
      <div className="w-full flex h-full md:max-h-screen py-[40px] md:py-[85px] bg-[--app-primary-color] text-white">
        <Container className="w-[90%] md:w-[1300px]">
          <h1
            className={cn(
              `${big_sholders_text.className} text-[40px] font-[600] text-center mb-8`
            )}
          >
            <AnimatedText text="Our Team" />
          </h1>
          <div className="w-full grid grid-cols-2 md:grid-cols-5 md:gap-0 gap-4">
            {teamMembers.map((team, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center text-center space-y-4"
              >
                <ImageFadeIn
                  src={team.img}
                  width={200}
                  height={200}
                  alt={team.name}
                  className="w-[150px] md:w-[180px] h-[150px] md:h-[180px] rounded-full"
                />
                <div>
                  <h1 className="text-sm font-euclid font-[500] text-slate-200">
                    <AnimatedText text={team?.name} />
                  </h1>
                  <p className=" font-euclid text-[12px] text-slate-200">
                    <AnimatedText text={team?.role} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </Reveal>
  );
};

export default HomeTeamSection;
