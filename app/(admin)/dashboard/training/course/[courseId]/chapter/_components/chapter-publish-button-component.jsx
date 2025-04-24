"use client";

import { Button } from "@/components/ui/button";
import { apiCall } from "@/lib/utils/api";
import { handleDeleteBtn } from "@/lib/utils/deleteItemFromDb";

import { ChevronLeft, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ChapterPublishButtonComponent = ({ chapter, isFieldsCompleted }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

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
      window.location.reload();
    } catch (error) {
      toast.error(
        `${error?.response?.data?.message}` || "something went wrong"
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = () => {
    handleDeleteBtn(
      `/training/course/${chapter.courseId}/chapter/${chapter.id}`,
      "",
      `/dashboard/training/course/${chapter.courseId}`,
      router
    );
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {!isPublishing && (
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-sky-700 font-semibold text-sm hover:text-sky-800 transition-all"
            onClick={() =>
              router.replace(
                `/dashboard/training/course/${chapter.courseId}?tab=lessons`
              )
            }
          >
            <ChevronLeft />
            Go back
          </Button>
        )}
        <Button
          disabled={!isFieldsCompleted || isPublishing}
          className="text-sm font-semibold bg-sky-700 italic text-white hover:bg-sky-800 transition-all"
          onClick={() =>
            handlePublishChapter(
              chapter.courseId,
              chapter.id,
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
            "Unpublish chapter"
          ) : (
            "Publish chapter"
          )}
        </Button>

        {!isPublishing && (
          <Trash2
            className="w-5 h-5 cursor-pointer hover:opacity-75 text-red-600"
            onClick={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default ChapterPublishButtonComponent;
