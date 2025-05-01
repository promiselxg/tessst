import React from "react";
import CourseDetailsHeader from "../../../_components/course-details-header";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import CourseSidebarItem from "../_components/CourseSidebarItem";
import Banner from "@/components/banner/banner";
import { getChapter } from "@/service/training/courseService";
import CourseVideoPlayer from "../_components/CourseVideoPlayer";
import Preview from "@/components/editor/preview";
import { Separator } from "@/components/ui/separator";
import CourseProgressButton from "../_components/course-progress-button";

import { BreadcrumbNav } from "@/components/breadcrumb/breadcrumb";

const page = async ({ params }) => {
  const cookieStore = cookies();
  const courseId = params.courseId;
  const chapterId = params.chapterId;

  const activeChapterId = params.chapterId;

  let userId = null;
  let user = [];
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
      user = decoded;

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

  console.log("course", course);
  // console.log("purchase", purchase);
  // console.log("muxData", muxData);
  // console.log("attachments", attachments);
  console.log("nextChapter", nextChapter);
  // console.log("userProgress", userProgress);
  // console.log("isCompleted", isCompleted);

  // console.log("userLevel", user.roles);
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

        <div className="w-full md:w-[80%] md:flex md:left-[20%] relative flex-col md:flex-row mb-20">
          <div className="w-full flex flex-col ">
            <div className="p-[17px] bg-emerald-950 text-white">
              <BreadcrumbNav
                prev={{
                  label: `${course.title}`,
                  href: `/training/${courseId}`,
                }}
                slug={chapter.title}
                className="text-[whitesmoke]"
              />
            </div>
            <div className="w-full ">
              {isLocked && (
                <Banner label="You need to register for this course to continue watching." />
              )}
            </div>
            {course.chapters.videoUrl && (
              <div className="w-full">
                <CourseVideoPlayer
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
            )}
            <div className="w-full">
              <div className="flex flex-col gap-y-2">
                <div className="px-5 pt-5">
                  <h1 className="text-2xl font-semibold">{chapter?.title}</h1>
                </div>
                {purchase && (
                  <div className="px-1">
                    <Preview value={chapter?.description} />
                  </div>
                )}
              </div>
              <div className="p-5">
                {purchase && (
                  <CourseProgressButton
                    chapterId={chapterId}
                    courseId={courseId}
                    nextChapterId={nextChapter?.id}
                    isCompleted={!!userProgress?.isCompleted}
                  />
                )}
              </div>
              <Separator />
              {!!attachments?.length && (
                <div className="p-4">
                  <h1 className="text-lg font-[400]">Course Materials</h1>
                  <div className="flex flex-col gap-2 w-fit">
                    {attachments?.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment?.asset?.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 underline"
                      >
                        <p className="line-clamp-1">{attachment.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
