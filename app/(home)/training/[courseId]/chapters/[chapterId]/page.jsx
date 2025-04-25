import React from "react";
import CourseDetailsHeader from "../../../_components/course-details-header";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import CourseSidebarItem from "../_components/CourseSidebarItem";
import Banner from "@/components/banner/banner";
import { getChapter } from "@/service/training/courseService";
import CourseVideoPlayer from "../_components/CourseVideoPlayer";

const page = async ({ params }) => {
  const cookieStore = cookies();
  const courseId = params.courseId;
  const chapterId = params.chapterId;

  const activeChapterId = params.chapterId;

  let userId = null;
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;

      if (!userId) {
        redirect(
          `/auth/login?callbackUrl=/training/${courseId}/chapters/${chapterId}`
        );
      }
    } catch (error) {
      redirect(
        `/auth/login?callbackUrl=/training/${courseId}/chapters/${chapterId}`
      );
    }
  } else {
    redirect(
      `/auth/login?callbackUrl=/training/${courseId}/chapters/${chapterId}`
    );
  }

  const {
    course,
    chapter,
    purchase,
    muxData,
    attachments,
    nextChapter,
    userProgress,
  } = await getChapter({ userId, courseId, chapterId });

  if (!course || !chapter) {
    redirect("/training");
  }

  const isLocked = !chapter.isFree && !purchase;
  const isCompleted = !!purchase && !userProgress?.isCompleted;

  console.log("chapter", chapter);
  console.log("purchase", purchase);
  console.log("muxData", muxData);
  console.log("attachments", attachments);
  console.log("nextChapter", nextChapter);
  console.log("userProgress", userProgress);
  console.log("isCompleted", isCompleted);
  console.log("publicId", muxData?.publicId);
  return (
    <>
      <CourseDetailsHeader courseId={course.id} links={course?.chapters} />
      <div className="w-full">
        <div className="w-[20%] border-r border-gray-200 h-screen hidden md:flex fixed left-0 flex-col justify-between">
          <nav className="flex flex-col w-full">
            {course.chapters.map((chapter) => {
              const isActive = chapter.id === activeChapterId;
              return (
                <CourseSidebarItem
                  key={chapter.id}
                  id={chapter.id}
                  label={chapter.title}
                  isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                  isLocked={!chapter.isFree && !purchase}
                  courseId={courseId}
                  isActive={isActive}
                />
              );
            })}
          </nav>
        </div>

        <div className="w-full md:w-[80%] md:flex md:left-[20%] relative flex-col md:flex-row">
          <div className="w-full flex flex-col ">
            <div className="w-full ">
              {isLocked && (
                <Banner label="You need to register for this course to continue watching." />
              )}
            </div>
            <div className="w-full">
              <CourseVideoPlayer
                videoUrl={chapter?.videoUrl}
                title={chapter?.title}
                isLocked={isLocked}
                courseId={courseId}
                chapterId={chapterId}
                nextChapterId={nextChapter?.id}
                purchaseId={purchase?.id}
                completeOnEnd={isCompleted}
                publicId={muxData?.publicId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
