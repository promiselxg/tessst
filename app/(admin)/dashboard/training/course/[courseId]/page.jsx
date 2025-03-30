"use client";

import { apiCall } from "@/lib/utils/api";
import { isValidUUID } from "@/lib/utils/validateUUID";

import { Loader2, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import TabsComponent from "../../../_components/dashboard/course-tap-component";
import DashboardHeader from "../../../_components/dashboard/header";
import Banner from "@/components/banner/banner";
import { Button } from "@/components/ui/button";
import { handleDeleteBtn } from "@/lib/utils/deleteItemFromDb";
import { toast } from "sonner";
import useConfettiStore from "@/store/confettiStore";

const CourseEditPage = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const confetti = useConfettiStore();
  const router = useRouter();
  const params = useParams();

  // Ensure params exist before accessing courseId
  const courseId = params?.courseId;

  useEffect(() => {
    if (!courseId || !isValidUUID(courseId)) {
      router.replace("/dashboard");
    }
  }, [courseId, router]);

  // Fetch course info with useCallback to prevent re-renders
  const fetchCourseInfo = useCallback(async () => {
    if (!courseId) return;
    try {
      setLoading(true);
      const response = await apiCall("GET", `/training/course/${courseId}`);
      if (!response || Object.keys(response).length === 0) {
        router.replace("/dashboard/courses");
      } else {
        setCourse(response.course);
      }
    } catch (error) {
      router.replace("/dashboard/courses");
    } finally {
      setLoading(false);
    }
  }, [courseId, router]);

  useEffect(() => {
    fetchCourseInfo();
  }, [fetchCourseInfo]);

  const handlePublishCourse = async (isPublished) => {
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
      fetchCourseInfo();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = () => {
    handleDeleteBtn(
      `/training/course/${courseId}`,
      "",
      `/dashboard/courses`,
      router
    );
  };

  // Ensure required fields are present for publishing
  const requiredFields = [
    course?.title,
    course?.description,
    course?.asset,
    course?.categoryId,
    course?.chapters?.some((chapter) => chapter?.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completedText = `(${completedFields}/${totalFields})`;
  const isFieldsCompleted = completedFields === totalFields;

  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Course setup" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[rgba(0,0,0,0.2)]">
        <div className="flex flex-col justify-center items-center mt-20">
          <Loader2 className=" animate-spin" />
          <p className="text-sm text-slate-500 italic">
            Loading course information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      {!course?.isPublished && (
        <Banner
          variant="warning"
          label="This course is yet to be published and won't be visible to users."
        />
      )}
      <div className="p-6 bg-[whitesmoke] min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2 mt-3">
              <h2 className="text-2xl">Customize this training course.</h2>
            </div>
            <span className="text-sm text-slate-700 italic font-bold">
              Complete all required fields {completedText}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              disabled={!isFieldsCompleted || isPublishing}
              onClick={() => handlePublishCourse(course?.isPublished)}
            >
              {isPublishing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  <span className="text-sm italic">
                    {course?.isPublished ? "Unpublishing..." : "Publishing..."}
                  </span>
                </div>
              ) : course?.isPublished ? (
                "Unpublish Course"
              ) : (
                "Publish Course"
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

        <TabsComponent initialData={course} courseId={course?.id} />
      </div>
    </>
  );
};

export default CourseEditPage;
