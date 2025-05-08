"use client";

import Container from "@/components/container/container";
import SearchInput from "@/components/search/search-input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useEffect, useMemo, useState } from "react";
import CategoryList from "./category-list";
import { CourseCard } from "@/components/card/course-card";
import { apiCall } from "@/lib/utils/api";
import { getAllTrainingCategories } from "@/service/training/courseService";
import { big_sholders_text } from "@/lib/fonts";
import { CourseCardSkeleton } from "@/components/skeleton/course-skeleton";

const AllCourses = ({ params }) => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const query = useMemo(
    () => ({
      title: params?.title,
      categoryId: params.categoryId,
      page: 1,
      limit: 10,
    }),
    [params?.title, params.categoryId]
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await apiCall("get", "/training/course/published", query);
        setCourses(data.courses);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [query]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getAllTrainingCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full flex h-fit  py-[40px] md:py-[85px]">
      <div className="flex flex-col w-full mx-auto">
        <Container className="w-[90%] md:w-[1100px] mx-auto mt-10">
          <SearchInput />
          <ScrollArea className="w-full whitespace-nowrap rounded-md my-4 pb-4">
            <CategoryList isLoading={isLoading} categories={categories} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Container>
        <Container className="w-[90%] md:w-[1100px] mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-8">
            {loading
              ? [...Array(4)].map((_, i) => <CourseCardSkeleton key={i} />)
              : courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={{
                      image: course.asset.publicUrl,
                      title: course.title,
                      chapters: course.chapters.length,
                      category: course.category.name,
                      progress: course.progress,
                      font: big_sholders_text.className,
                    }}
                    href={`/training/${course.id}`}
                  />
                ))}
            {!loading && courses.length === 0 && "No course found"}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AllCourses;
