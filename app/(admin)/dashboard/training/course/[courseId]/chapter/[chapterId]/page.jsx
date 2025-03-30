"use client";

import ChapterTabsComponent from "@/app/(admin)/dashboard/_components/dashboard/chapter-tab-component";
import DashboardHeader from "@/app/(admin)/dashboard/_components/dashboard/header";
import Banner from "@/components/banner/banner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { apiCall } from "@/lib/utils/api";
import { handleDeleteBtn } from "@/lib/utils/deleteItemFromDb";
import { Loader2, Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ChapterEditPage = ({ params }) => {
  const { user } = useAuth();
  const [chapter, setChapter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  if (!user) {
    redirect(`/auth/login`);
  }

  const requiredFields = [chapter.title, chapter.description];

  const totalFields = requiredFields?.length;
  const completedFields = requiredFields.filter(Boolean)?.length;
  const completedText = `(${completedFields}/${totalFields})`;

  const isFieldsCompleted = requiredFields.filter(Boolean);

  const fetchChapterInfo = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        "get",
        `/training/course/${params.courseId}/chapter/${params.chapterId}`
      );
      setChapter(response.chapter);
    } catch (error) {
      toast.error(`${error.message}` || "something went wrong");
    } finally {
      setLoading(false);
    }
  }, [params.courseId, params.chapterId]);

  useEffect(() => {
    fetchChapterInfo();
  }, [fetchChapterInfo]);

  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    {
      name: "Course setup",
      href: `/dashboard/training/course/${params.courseId}?tab=lessons`,
    },
    { name: "Course chapter setup" },
  ];

  const handleDelete = () => {
    handleDeleteBtn(
      `/training/course/${params.courseId}/chapter/${params.chapterId}`,
      "",
      `/training/course/${params.courseId}`,
      router
    );
  };

  const handlePublishChapter = async (courseId, chapterId, isPublished) => {
    if (!courseId || !chapterId) return;
    try {
      setIsPublishing(true);
      const endpoint = isPublished
        ? `/training/course/${courseId}/chapter/${chapterId}/unpublish`
        : `/training/course/${courseId}/chapter/${chapterId}/publish`;

      await apiCall("patch", endpoint);
      toast.success(
        `Chapter successfully ${isPublished ? "unpublished" : "published"}.`
      );

      fetchChapterInfo();
    } catch (error) {
      toast.error(`${error.message}` || "something went wrong");
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[rgba(0,0,0,0.2)]">
        <div className="flex flex-col justify-center items-center mt-20">
          <Loader2 className=" animate-spin" />
        </div>
      </div>
    );
  }
  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label={`This chapter is yet to be published therefore won't be visible in the course page.`}
        />
      )}
      <div className="p-4 w-full">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold">
            Completed Fields : {completedText}
          </p>
          <div className="flex items-center gap-3">
            <Button
              disabled={!isFieldsCompleted || isPublishing}
              onClick={() =>
                handlePublishChapter(
                  params.courseId,
                  params.chapterId,
                  chapter.isPublished
                )
              }
            >
              {isPublishing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  <span className="text-sm italic">
                    {chapter.isPublished ? "Unpublishing..." : "Publishing..."}
                  </span>
                </div>
              ) : chapter.isPublished ? (
                "Unpublish Chapter"
              ) : (
                "Publish Chapter"
              )}
            </Button>

            {!isPublishing && (
              <Trash2
                className="w-5 h-5 cursor-pointer hover:opacity-75 text-red-600"
                onClick={handleDelete}
              />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 bg-[whitesmoke] min-h-screen relative">
        <ChapterTabsComponent
          initialData={chapter}
          chapterId={params.chapterId}
          courseId={params.courseId}
        />
      </div>
    </>
  );
};

export default ChapterEditPage;
