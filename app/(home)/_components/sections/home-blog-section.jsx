import Reveal from "@/components/animation/reveal";
import Container from "@/components/container/container";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeBlogSection = () => {
  const blogPosts = [
    {
      image: "/img/project1.png",
      date: "13 March, 2025",
      title: "Blog topic will be put out here",
      desc: "Donec aliquam ultrices purus, nec laoreet elit Integer eget nisi ultrices, hendrerit urna at, pulvinar diam. Donec sit amet facilisis dolor nunc eget purus",
    },
    {
      image: "/img/project1.png",
      date: "13 March, 2025",
      title: "Blog topic will be put out here",
      desc: "Donec aliquam ultrices purus, nec laoreet elit Integer eget nisi ultrices, hendrerit urna at, pulvinar diam. Donec sit amet facilisis dolor nunc eget purus",
    },
    {
      image: "/img/project1.png",
      date: "13 March, 2025",
      title: "Blog topic will be put out here",
      desc: "Donec aliquam ultrices purus, nec laoreet elit Integer eget nisi ultrices, hendrerit urna at, pulvinar diam. Donec sit amet facilisis dolor nunc eget purus",
    },
    {
      image: "/img/project1.png",
      date: "13 March, 2025",
      title: "Blog topic will be put out here",
      desc: "Donec aliquam ultrices purus, nec laoreet elit Integer eget nisi ultrices, hendrerit urna at, pulvinar diam. Donec sit amet facilisis dolor nunc eget purus",
    },
  ];
  return (
    <Reveal direction="right">
      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <Container className="w-[90%] md:w-[1100px] mx-auto">
          <h1
            className={cn(
              `${big_sholders_text.className} text-[40px] text-center font-[700] mb-10`
            )}
          >
            Our Blog
          </h1>

          <div className="w-full flex gap-10 flex-col md:flex-row">
            {/* Left Big Post */}
            <div className="w-full md:w-[40%]">
              <div className="h-fit md:h-[450px] w-full">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    width={450}
                    height={450}
                    className="w-full md:h-[450px] object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="space-y-1">
                <p className="mt-5 text-sm font-euclid text-slate-700">
                  {blogPosts[0].date}
                </p>
                <Link href="">
                  <h1
                    className={cn(
                      `${big_sholders_text.className} text-[20px] font-[600] w-fit`
                    )}
                  >
                    {blogPosts[0].title}
                  </h1>
                </Link>
                <p className="text-[--app-primary-text] font-euclid text-[12px] md:text-sm">
                  {blogPosts[0].desc}
                </p>
              </div>
            </div>

            {/* Right List */}
            <div className="w-full md:w-[60%] h-full gap-5 flex flex-col">
              {blogPosts.slice(1).map((post, i) => (
                <div
                  key={i}
                  className="h-fit md:h-[200px] w-full flex gap-4 flex-col md:flex-row"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={200}
                    height={200}
                    className="w-full md:w-[250px] md:h-[200px]"
                  />
                  <div className="space-y-1">
                    <p className="mt-5 text-sm font-euclid text-slate-700">
                      {post.date}
                    </p>
                    <Link href="">
                      <h1
                        className={cn(
                          `${big_sholders_text.className} text-[16px] font-[600] w-fit`
                        )}
                      >
                        {post.title}
                      </h1>
                    </Link>
                    <p className="text-[--app-primary-text] font-euclid text-[12px]">
                      {post.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Reveal>
  );
};

export default HomeBlogSection;
