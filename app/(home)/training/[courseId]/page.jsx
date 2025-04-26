"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getTrainingProgress } from "@/service/training/courseService";
import { apiCall } from "@/lib/utils/api";

import CourseDetailsHeader from "../_components/course-details-header";

import { useRouter } from "next/navigation";
import { BookOpen, Compass, Lock } from "lucide-react";
import { BiSolidVideos } from "react-icons/bi";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import VideoPlayer from "@/components/video/videoPlayer";
import { toast } from "sonner";

const menuItems = [
  { label: "Browse all courses", icon: Compass, href: "/training" },
];

const SingleCoursePage = ({ params }) => {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollLoader, setEnrollLoader] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiCall(
          "get",
          `/training/course/${params.courseId}`
        );
        if (!response) {
          router.replace("/training");
        } else {
          const preview =
            response?.course?.chapters.find((ch) => ch.isFree) || null;
          const videoPreview = preview?.videoUrl || null;
          setCourse({
            ...response.course,
            videoPreview,
            enrolled: response.enrolled,
          });
        }
      } catch (error) {
        router.replace("/training");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [params.courseId, router]);

  // Fetch progress
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
  }, [params.courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-[--app-primary-color] border-t-transparent" />
          <p className="text-sm text-muted-foreground font-medium">
            Loading course, please wait...
          </p>
        </div>
      </div>
    );
  }

  const handleEnroll = async (courseId) => {
    try {
      setEnrollLoader(true);
      const response = await apiCall(
        "get",
        `/training/course/enroll/${courseId}`
      );
      if (response) {
        toast.success(response?.message || "Enrolled successfully!");
        router.replace(`/training/${courseId}/chapters/${response?.chapterId}`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error enrolling in course"
      );
      console.error("Error enrolling in course:", error);
    } finally {
      setEnrollLoader(false);
    }
  };

  const handleContinueLearning = async () => {
    router.push(`/training/${course.id}/chapters/${course?.chapters[0]?.id}`);
  };

  return (
    <>
      <CourseDetailsHeader courseId={course.id} links={course?.chapters} />

      <div className="w-full">
        {/* Sidebar */}
        <div className="w-[20%] border-r border-gray-200 h-screen hidden md:flex fixed left-0 flex-col justify-between">
          <nav className="flex flex-col space-y-4 w-full p-4 overflow-hidden">
            {menuItems.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-[7px] transition-colors w-full bg-muted text-[--app-primary-color] font-medium"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="w-full p-4 absolute bottom-20 left-0">
            <div className="p-5 border rounded-md bg-white text-black">
              <h1 className="font-semibold mb-1 text-[--app-primary-color]">
                Upgrade membership
              </h1>
              <p className="text-sm text-muted-foreground font-euclid font-thin leading-snug">
                Unlock all courses, get access to exclusive materials, and more.
              </p>
              <Button className="w-full text-xs font-[400] bg-[--app-primary-color] mt-2">
                Upgrade
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-[80%] md:h-screen md:flex md:left-[20%] relative py-8 px-5 flex-col md:flex-row">
          <div className="w-full flex gap-5 flex-col md:flex-row">
            <div className="w-full md:w-[65%]">
              {course?.videoPreview && (
                <div className="w-full bg-slate-700">
                  <VideoPlayer url={course?.videoPreview} />
                </div>
              )}
              <div className="w-full my-5 border border-gray-200 rounded-md p-5 flex flex-col gap-5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-[--course-highlight-bg]" />
                  {course?.chapters?.length} Chapters
                </div>
                <h1 className="text-base font-[600] mb-0 text-[--app-primary-color]">
                  {course?.title}
                </h1>
                <p
                  className="text-sm text-muted-foreground font-euclid font-thin leading-snug"
                  dangerouslySetInnerHTML={{ __html: course?.description }}
                />
                <div className="w-full text-sm text-muted-foreground font-euclid font-thin leading-snug flex flex-col gap-2">
                  <Progress value={courseProgress} />
                  {courseProgress !== null && (
                    <p className="text-sm text-muted-foreground font-euclid font-thin leading-snug">
                      {courseProgress}% completed
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full md:w-[35%]">
              <div className="md:sticky md:top-[100px] flex flex-col">
                <div className="w-full p-5 border rounded-md text-secondary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900 border-gray-200 flex flex-col gap-5">
                  <h1 className="text-base font-[600]">
                    {course?.enrolled
                      ? "Continue where you left off."
                      : "Enroll to start."}
                  </h1>
                  <p className="text-sm text-neutral-200">
                    {course?.enrolled
                      ? "Watch from your last completed chapter."
                      : "Track your progress, watch with subtitles, change quality & speed, and more."}
                  </p>
                  <Button
                    disabled={enrollLoader}
                    onClick={() =>
                      course?.enrolled
                        ? handleContinueLearning()
                        : handleEnroll(course.id)
                    }
                    variant="secondary"
                    className="w-full text-sm font-[400] flex items-center justify-center gap-2"
                  >
                    {enrollLoader ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-[--app-primary-color] border-t-transparent" />
                        <span>please wait...</span>
                      </div>
                    ) : course?.enrolled ? (
                      <div className="flex items-center gap-2">
                        <BiSolidVideos className="w-4 h-4" />
                        <span>Continue watching</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span>Enroll now</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCoursePage;
