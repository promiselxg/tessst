"use client";

import AttachmentForm from "@/components/training/attachment-form";
import CategoryForm from "@/components/training/category-form";
import ChaptersForm from "@/components/training/chapters-form";
import DescriptionForm from "@/components/training/description-form";
import ImageFileUploadForm from "@/components/training/image-upload-form";
import TitleForm from "@/components/training/title-form";
import { apiCall } from "@/lib/utils/api";
import { isValidUUID } from "@/lib/utils/validateUUID";

import { Book } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import TabsComponent from "../../../_components/dashboard/tap-component";

const CourseEditPage = () => {
  const [course, setCourse] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

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

  useEffect(() => {
    fetchCourseInfo();
    fetchCourseCategories();
  }, [courseId, fetchCourseInfo]);

  if (!params) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!course) {
    router.replace("/dashboard");
  }

  console.log("COURSE", course);
  console.log("=========================");
  console.log("CATEGORIES", categories);

  return (
    <div className="p-6 bg-[whitesmoke]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completedText}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-x-2 mt-3">
        <h2 className="text-xl">Customize your course</h2>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <ImageFileUploadForm initialData={course} courseId={course.id} />
        </div>
        <div>
          <ChaptersForm initialData={course} courseId={course.id} />

          <AttachmentForm initialData={course} courseId={course.id} />
        </div>
      </div> */}
      <TabsComponent />
    </div>
  );
};

export default CourseEditPage;
