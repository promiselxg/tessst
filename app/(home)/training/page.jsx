<<<<<<< HEAD
import React from "react";
import AllCourses from "./_components/course-component";

const page = async ({ searchParams }) => {
  return (
    <>
      <AllCourses params={searchParams} />
=======
import { CourseCard } from "@/components/card/course-card";
import Container from "@/components/container/container";
import SearchInput from "@/components/search/search-input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { courseList } from "@/data/course";
import { big_sholders_text } from "@/lib/fonts";
import { getAllTrainingCategories } from "@/service/training/courseService";

import React from "react";
import CategoryList from "./_components/category-list";

const page = async () => {
  const categories = await getAllTrainingCategories();

  return (
    <>
      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto mt-10">
            <SearchInput />
            <ScrollArea className="w-full whitespace-nowrap rounded-md my-4 pb-4">
              <CategoryList categories={categories} />
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
>>>>>>> c81a9ca2e0946054da44efaf67fe42ec66e66886
    </>
  );
};

export default page;
