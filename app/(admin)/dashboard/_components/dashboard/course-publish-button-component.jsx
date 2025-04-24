"use client";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/lib/utils/api";
import { handleDeleteBtn } from "@/lib/utils/deleteItemFromDb";
import useConfettiStore from "@/store/confettiStore";
import { ChevronLeft, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CoursePublishButtonComponent = ({
  isFieldsCompleted,
  isPublished,
  courseId,
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const confetti = useConfettiStore();
  const router = useRouter();

  const handlePublishCourse = async (isPublished, courseId) => {
    if (!courseId) return;
    try {
      setIsPublishing(true);
      const endpoint = isPublished
        ? `/training/course/${courseId}/unpublish`
        : `/training/course/${courseId}/publish`;

      await apiCall("patch", endpoint);
      toast.success(
        `Course successfully ${isPublished ? "unpublished" : "published"}.`
      );
      confetti.showConfetti();
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = (courseId) => {
    handleDeleteBtn(
      `/training/course/${courseId}`,
      "",
      `/dashboard/courses`,
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
            onClick={() => router.replace(`/dashboard/training`)}
          >
            <ChevronLeft />
            Go back
          </Button>
        )}
        <Button
          className="text-sm font-semibold bg-sky-700 italic text-white hover:bg-sky-800 transition-all"
          disabled={!isFieldsCompleted || isPublishing}
          onClick={() => handlePublishCourse(isPublished, courseId)}
        >
          {isPublishing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
              <span className="text-sm italic">
                {isPublished ? "Unpublishing..." : "Publishing..."}
              </span>
            </div>
          ) : isPublished ? (
            "Unpublish Course"
          ) : (
            "Publish Course"
          )}
        </Button>

        {!isPublishing && (
          <Trash2
            className="w-5 h-5 cursor-pointer hover:opacity-75 text-red-600"
            onClick={() => handleDelete(courseId)}
          />
        )}
      </div>
    </>
  );
};

export default CoursePublishButtonComponent;
