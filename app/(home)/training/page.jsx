import { CourseCard } from "@/components/card/course-card";
import Container from "@/components/container/container";
import { CategoryItem } from "@/components/training/category-item";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { courseCategories } from "@/data/category";
import { courseList } from "@/data/course";
import { big_sholders_text } from "@/lib/fonts";
import { Search } from "lucide-react";

import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto mt-10">
            <div className="flex items-center mt-10 md:mt-0">
              <span className="-mr-8">
                <Search className="h-5 w-5 text-slate-700" />
              </span>
              <Input
                className="pl-10 h-12 rounded-[10px] tracking-wide w-full"
                placeholder="Search courses"
              />
            </div>
            <ScrollArea className="w-full whitespace-nowrap rounded-md my-4 pb-4">
              <ul className="flex gap-2">
                {courseCategories.map((course, i) => (
                  <li key={i} className="shrink-0">
                    <CategoryItem name={course.name} active={i === 0} />
                  </li>
                ))}
              </ul>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Container>
          <Container className="w-[90%] md:w-[1100px] mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4  gap-4  gap-y-8">
              {courseList.map((course, i) => (
                <CourseCard
                  key={i}
                  course={{
                    image: course.image,
                    title: course.title,
                    chapters: course.chapters,
                    font: big_sholders_text.className,
                  }}
                  href={`/training/${course.slug}`}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
