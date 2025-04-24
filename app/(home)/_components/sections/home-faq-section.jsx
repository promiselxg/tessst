import { Counter } from "@/components/animation/counter";
import ImageFadeIn from "@/components/animation/imageFadeIn";
import Container from "@/components/container/container";
import FaqItem from "@/components/faq/faqItems";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const faqData = [
  {
    number: "01",
    question: "Our FAQ title will be here while body text stays below",
    answer:
      "Timperdiet gravida scelerisque odio nunc. Eget felis, odio bibendum quis eget sit lorem donec diam. Volutpat sed orci turpis sit dolor est a pretium eget.",
  },
  {
    number: "02",
    question: "Our FAQ title will be here while body text stays below",
    answer:
      "Timperdiet gravida scelerisque odio nunc. Eget felis, odio bibendum quis eget sit lorem donec diam. Volutpat sed orci turpis sit dolor est a pretium eget.",
  },
  {
    number: "03",
    question: "Our FAQ title will be here while body text stays below",
    answer:
      "Timperdiet gravida scelerisque odio nunc. Eget felis, odio bibendum quis eget sit lorem donec diam. Volutpat sed orci turpis sit dolor est a pretium eget.",
  },
  {
    number: "04",
    question: "Our FAQ title will be here while body text stays below",
    answer:
      "Timperdiet gravida scelerisque odio nunc. Eget felis, odio bibendum quis eget sit lorem donec diam. Volutpat sed orci turpis sit dolor est a pretium eget.",
  },
];

const HomeFAQSection = () => {
  return (
    <>
      <div className="w-full flex h-full md:max-h-screen">
        <Container className="w-[90%] md:w-[1300px]">
          <div className="py-16">
            <h2
              className={cn(
                `${big_sholders_text.className} text-center text-2xl md:text-4xl font-[600] mb-10`
              )}
            >
              We answer your popular questions
            </h2>
            <div className="flex gap-5 w-full items-center h-full flex-col md:flex-row">
              <div className="w-full md:w-2/3">
                {faqData?.map((faq, index) => (
                  <FaqItem
                    key={index}
                    number={faq.number}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
              <div className="relative justify-end flex flex-col w-full md:w-[40%] h-full md:h-[500px]">
                <div className="md:flex justify-end hidden">
                  <Image
                    src="/img/project4.png"
                    alt="Helping People"
                    width={600}
                    height={400}
                    className="w-[350px] h-[450px] object-cover"
                  />
                </div>
                <div className="gap-4 flex md:absolute bottom-[10%] right-20">
                  <div className="bg-[#00923F] text-white p-6  w-40">
                    <p
                      className={cn(
                        `${big_sholders_text.className} text-sm mb-2`
                      )}
                    >
                      Projects
                    </p>
                    <h3
                      className={cn(
                        `${big_sholders_text.className} text-5xl font-bold`
                      )}
                    >
                      <Counter targetNumber={115} />
                    </h3>
                    <p className="text-xs mt-2 font-euclid">
                      Projects with results
                    </p>
                  </div>
                  <div className="bg-[#D9251E] text-white p-6  w-40">
                    <p
                      className={cn(
                        `${big_sholders_text.className} text-sm mb-2`
                      )}
                    >
                      People
                    </p>
                    <h3
                      className={cn(
                        `${big_sholders_text.className} text-5xl font-bold`
                      )}
                    >
                      <Counter targetNumber={182} />
                    </h3>
                    <p className="text-xs mt-2 font-euclid">People reached</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomeFAQSection;
