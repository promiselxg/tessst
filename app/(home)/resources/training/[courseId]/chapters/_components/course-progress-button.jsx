"use client";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/lib/utils/api";
import useConfettiStore from "@/store/confettiStore";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}) => {
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();
  const confetti = useConfettiStore();

  const handleCompleted = async () => {
    try {
      setIsLoading(true);

      await apiCall(
        "put",
        `/training/course/${courseId}/chapter/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.showConfetti();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/training/${courseId}/chapters/${nextChapterId}`);
      }
      toast.success("Progress updated");
      router.refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong"
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      disabled={isLoading}
      onClick={() => handleCompleted()}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto text-xs "
    >
      {!isLoading && <Icon className="h-4 w-4 ml-2" />}
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className=" animate-spin h-4 w-4" />
          please wait...
        </div>
      ) : isCompleted ? (
        "Mark as not completed"
      ) : (
        "Mark as complete and continue"
      )}
    </Button>
  );
};

export default CourseProgressButton;
