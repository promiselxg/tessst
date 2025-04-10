import Reveal from "@/components/animation/reveal";
import Container from "@/components/container/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <div className="w-full flex h-fit md:min-h-[500px] py-[40px] md:py-[85px] flex-col">
        <div className="w-full bg-[--course-bg]">
          <Container className="md:w-[1000px] p-[--course-padding] text-white">
            <div className="w-full flex gap-6 flex-col">
              <Breadcrumb className="text-white mt-5 md:mt-0">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href="/"
                        className="hover:text-[whitesmoke] transition-all"
                      >
                        Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href="/training"
                        className="hover:text-[whitesmoke] transition-all"
                      >
                        All courses
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-[whitesmoke] italic">
                      {params.slug}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="w-full flex gap-5 items-center flex-col md:flex-row">
                <div className="w-full md:w-[60%] mb-5 md:mb-0">
                  <h1
                    className={cn(
                      `font-euclid font-[500] text-[20px] md:text-[30px] md:leading-[1.3em]`
                    )}
                  >
                    {params.slug}
                  </h1>
                  <div className="py-5 flex items-center gap-2 italic">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4" /> 38 Chapters
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-[400] tracking-wider">
                        Created by :
                      </span>
                      <span className="text-sm font-[400] tracking-wider">
                        Anuforo O.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm tracking-wider font-[400]">
                    <Clock className="w-4 h-4" />
                    Last updated{" "}
                    <span className="font-[600]">Aug 5th, 2025</span>
                  </div>
                </div>
                <div className="w-full md:w-[40%] bg-[--course-highlight-bg] justify-end flex rounded-[8px] flex-col px-6 py-5">
                  <h1 className="text-[18px]">Ready to Start Learning?</h1>
                  <p className="text-sm text-[--course-text-color] mt-2">
                    Track your progress, watch with subtitles, change quality,
                    and lots more.
                  </p>
                  <Button className="bg-[--app-primary-color] text-white text-sm mt-3 transition-all">
                    <VideoIcon />
                    Start learning
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Container className="md:w-[1000px] p-[--course-padding] text-neutral-900">
          <Reveal>
            <div className="w-full border bg-white p-5 border-[rgba(0,0,0,0.1)]">
              <h1
                className={cn(
                  `text-[20px] md:text-[30px] font-[600] mb-3 text-slate-700`
                )}
              >
                About this course
              </h1>
              <p className="text-sm text-slate-700 leading-relaxed">
                In this free 14 hour tutorial you are going to learn how to
                build a Twitch Clone using Next 14. We are going to start with
                the basics like configuring Next.js, learning the routing
                concepts, and then slowly go deeper into setting up
                authentication, database, local tunnels, webhooks, all the way
                to generating RTMP and WHIP connections to connect to our OBS
                streaming software.
              </p>
            </div>
          </Reveal>
        </Container>
      </div>
    </>
  );
};

export default page;
