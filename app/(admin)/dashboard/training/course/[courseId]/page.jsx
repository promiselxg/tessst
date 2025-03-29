"use client";

import { apiCall } from "@/lib/utils/api";
import { isValidUUID } from "@/lib/utils/validateUUID";

import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import TabsComponent from "../../../_components/dashboard/course-tap-component";
import DashboardHeader from "../../../_components/dashboard/header";

const CourseEditPage = () => {
  const [course, setCourse] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const { courseId } = params;

  if (!isValidUUID(courseId)) {
    router.replace("/dashboard");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.asset,
    course.categoryId,
    course.chapters?.some((chapter) => chapter?.isPublished),
  ];

  const totalFields = requiredFields?.length;
  const completedFields = requiredFields.filter(Boolean)?.length;
  const completedText = `(${completedFields}/${totalFields})`;

  const fetchCourseInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", `/training/course/${courseId}`);

      if (!response || Object.keys(response).length === 0) {
        router.replace("/dashboard");
      }

      setCourse(response?.course);
    } catch (error) {
      console.log(error);
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [courseId, router]);

  const fetchCourseCategories = async () => {
    try {
      const response = await apiCall("GET", "/training/course/category");
      if (response) {
        setCategories(response.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Course setup" },
  ];

  useEffect(() => {
    fetchCourseInfo();
    fetchCourseCategories();
  }, [courseId, fetchCourseInfo]);

  if (!params) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[rgba(0,0,0,0.2)]">
        <div className="flex flex-col justify-center items-center mt-20">
          <Loader2 className=" animate-spin" />
          <p className="text-sm text-slate-500 italic">
            loading course information...
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    router.replace("/dashboard");
  }

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <div className="p-6 bg-[whitesmoke] min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completedText}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-2 mt-3">
          <h2 className="text-xl">Customize this training course.</h2>
        </div>
        <TabsComponent initialData={course} courseId={course.id} />
      </div>
    </>
  );
};

export default CourseEditPage;
