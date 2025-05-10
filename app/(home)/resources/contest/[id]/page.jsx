import { BreadcrumbNav } from "@/components/breadcrumb/breadcrumb";
import PrizeCard from "@/components/card/contest-prize-card";
import Container from "@/components/container/container";
import List from "@/components/list/list";
import ListWithIcon from "@/components/list/list-with-icon";
import CountdownTimer from "@/components/timer/countdown";
import { Button } from "@/components/ui/button";
import { ContestFormProvider } from "@/context/contest.form.conext";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { CalendarCheck2, CalendarX2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const prizes = [
  {
    title: "2nd Place",
    amount: "2,000 USD",
    perks: ["Trip to Ghana", "Workshop Equipment"],
  },
  {
    title: "Grand Winner",
    amount: "5,000 USD",
    perks: ["Trip to Asia", "Trip to Aso Rock"],
  },
  {
    title: "3rd Place",
    amount: "1,000 USD",
    perks: ["Gift Cards", "Online Course Access"],
  },
];

const how_to_participate = [
  "Sign up for Appwrite Cloud. You can create your account by heading to Appwrite Cloud website.",
  "Build an open-source app on any idea of your choice using Appwrite. Having difficulty coming up with an idea? Check out the app ideas below!",
  "Launch your app by publishing an article on your Hashnode blog - no blog yet? Set it up here.",
  "Submit your project on the new Built with Appwrite website.",
  "Make sure to follow the Appwrite recommended project submission template when writing your article on Hashnode.",
  "Link back to Appwrite Cloud and Hashnode in your project article.",
  "Tag the article with #appwrite and #AppwriteHackathon hashtags! This is how we track who's in.",
];

const judging_criteria = [
  {
    title: "Product Thinking",
    description:
      "Usefulness of the project in a real-world scenario. Completeness of the features implemented.",
  },
  {
    title: "UI/UX",
    description:
      "The overall look, layout, color usage, and positioning in the application.",
  },
  {
    title: "Code",
    description:
      "Quality (clean code, proper naming conventions, use of linter); use of best practices.",
  },
  {
    title: "Completeness of the Article",
    description:
      "The blog should cover all aspects of your project. What inspired you to create this project? What problem does the project address? How did you build it?",
  },
  {
    title: "Comprehensibility",
    description:
      "Try to avoid esoteric jargon in your article. Use simple language to convey your thoughts.",
  },
  {
    title: "Usage of Appwrite",
    description:
      "Is Appwrite central to the functioning of your project? How many and how well have the different Appwrite services been leveraged?",
  },
];

const page = async ({ params }) => {
  const orderedPrizes = [...prizes].sort((a, b) => {
    const order = { "2nd place": 0, "grand winner": 1, "3rd place": 2 };
    return order[a.title.toLowerCase()] - order[b.title.toLowerCase()];
  });

  return (
    <>
      <div className="p-[17px] bg-emerald-950 text-white mt-[85px]">
        <Container className="w-[90%] md:w-[1100px] mx-auto">
          <BreadcrumbNav
            prev={{
              label: `Competition`,
              href: `/resources/contest`,
            }}
            slug="Black And White Compositions"
            className="text-[whitesmoke]"
          />
        </Container>
      </div>
      <div className="w-full flex h-fit py-[40px] md:py-[50px]">
        <Container className="w-[90%] md:w-[1100px] mx-auto">
          <div className="flex flex-col w-full mx-auto">
            <div className="w-full">
              <div className="w-full flex">
                <Image
                  src="/img/contest/1.jpg"
                  alt="image contest"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-[300px] md:h-[400px] object-cover overflow-clip"
                />
              </div>
              <div className="bg-white p-5 flex flex-col gap-4">
                <h1
                  className={cn(
                    "text-[28px] md:text-4xl font-[400]",
                    big_sholders_text.className
                  )}
                >
                  Black And White Compositions
                </h1>
                <div className="w-full flex gap-5 justify-between md:items-center flex-col md:flex-row">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Start:</span>
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <CalendarCheck2 className="w-4 h-4" />
                      15th April, 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">End:</span>
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <CalendarX2 className="w-4 h-4" />
                      08th May, 2026
                    </span>
                  </div>
                </div>
                <div className="w-full py-4 flex flex-col space-y-5">
                  <h1
                    className={cn(
                      "text-[28px] md:text-3xl font-[400]",
                      big_sholders_text.className
                    )}
                  >
                    Overview
                  </h1>
                  <p className="text-sm text-gray-500 my-1 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur blanditiis quas id obcaecati, voluptas laborum
                    assumenda harum iste nemo ad. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Tenetur blanditiis quas id
                    obcaecati, voluptas laborum assumenda harum iste nemo ad.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur blanditiis quas id obcaecati, voluptas laborum
                    assumenda harum iste nemo ad.
                  </p>
                  <h1
                    className={cn(
                      "text-[28px] md:text-3xl font-[400]",
                      big_sholders_text.className
                    )}
                  >
                    Rewards and Prizes
                  </h1>
                  <div className="w-full flex justify-center">
                    <div className="w-full flex justify-center">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-6xl">
                        {orderedPrizes?.map((prize, index) => (
                          <PrizeCard key={index} {...prize} index={index} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <h1
                    className={cn(
                      "text-[28px] md:text-3xl font-[400]",
                      big_sholders_text.className
                    )}
                  >
                    How to participate
                  </h1>
                  <div className="w-full flex justify-center">
                    <div className="w-full">
                      <List items={how_to_participate} />
                    </div>
                  </div>
                  <h1
                    className={cn(
                      "text-[28px] md:text-3xl font-[400]",
                      big_sholders_text.className
                    )}
                  >
                    Evaluation criteria
                  </h1>
                  <h1>
                    Projects will be judged based on the following criteria:
                  </h1>
                  <div className="w-full flex justify-center">
                    <div className="w-full">
                      <ListWithIcon items={judging_criteria} />
                    </div>
                  </div>
                </div>
                <h1
                  className={cn(
                    "text-[28px] md:text-3xl font-[400]",
                    big_sholders_text.className
                  )}
                >
                  Duration
                </h1>
                <div className="py-5">
                  <CountdownTimer targetDate="2026-05-08" total={6} />
                </div>
                <Link
                  href="/resources/contest/1111/join"
                  className="md:w-fit w-full"
                >
                  <Button className="bg-[--app-primary-color] text-white h-10 rounded-md hover:bg-[--app-primary-color] transition duration-300 ease-in-out w-full">
                    Join to participate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default page;
