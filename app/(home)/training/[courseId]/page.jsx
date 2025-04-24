"use client";

import React, { useEffect, useState } from "react";
import { CourseHeader } from "../_components/course-header";
import { getTrainingProgress } from "@/service/training/courseService";
import { apiCall } from "@/lib/utils/api";
import Container from "@/components/container/container";
import Reveal from "@/components/animation/reveal";

const SingleCoursePage = ({ params }) => {
  const [courseProgress, setCourseProgress] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const { progressPercentage } = await getTrainingProgress(
          params.courseId
        );
        setCourseProgress(progressPercentage);
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };
    fetchCourseProgress();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { course } = await apiCall(
          "get",
          `/training/course/${params.courseId}`
        );
        setCourse(course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [params.courseId]);

  return (
    <div className="w-full flex h-fit md:min-h-[500px] py-[40px] md:py-[85px] flex-col">
      <CourseHeader
        prev={{ label: "All Courses", href: "/training" }}
        course={course}
        loading={loading}
      />
      <Container className="md:w-[1000px] p-[--course-padding] text-neutral-900">
        {!loading && (
          <Reveal>
            <div className="w-full border bg-white p-5 border-[rgba(0,0,0,0.1)]">
              <h1 className="text-[20px] md:text-[30px] font-[600] mb-3 text-slate-700">
                About this course
              </h1>
              <p
                className="text-sm text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course?.description }}
              ></p>
            </div>
          </Reveal>
        )}
      </Container>
    </div>
  );
};

export default SingleCoursePage;
