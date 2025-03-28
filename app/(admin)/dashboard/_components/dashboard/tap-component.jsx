"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Lock, Layout, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import CourseTitleForm from "@/components/training/course-title-form";
import CourseDescriptionForm from "@/components/training/course-description-form";
import AttachmentForm from "@/components/training/attachment-form";
import ImageFileUploadForm from "@/components/training/image-upload-form";
import ChaptersForm from "@/components/training/chapters-form";
import CategoryForm from "@/components/training/category-form";
import { apiCall } from "@/lib/utils/api";

const tabs = [
  {
    name: "Course title",
    icon: <Lock className="h-4 w-4 mr-1" />,
    key: "course",
  },
  {
    name: "Course description",
    icon: <Lock className="h-4 w-4 mr-1" />,
    key: "description",
  },
  {
    name: "Attachments",
    icon: <Layout className="h-4 w-4 mr-1" />,
    key: "attachment",
  },
  {
    name: "Chapters (modules)",
    icon: <BookOpen className="h-4 w-4 mr-1" />,
    key: "lessons",
  },
];

const TabsComponent = ({ initialData, courseId }) => {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("course");
  let activeScreen;

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchCourseCategories = async () => {
      try {
        const response = await apiCall("GET", "/training/course/category");
        if (response) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCourseCategories();
  }, []);

  const handleTabClick = (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  switch (activeTab) {
    case "course":
      activeScreen = (
        <CourseTitleForm initialData={initialData} courseId={courseId} />
      );
      break;
    case "description":
      activeScreen = (
        <CourseDescriptionForm initialData={initialData} courseId={courseId} />
      );
      break;
    case "attachment":
      activeScreen = (
        <div className="flex gap-2 w-full justify-between flex-col">
          <ImageFileUploadForm initialData={initialData} courseId={courseId} />
          <AttachmentForm initialData={initialData} courseId={courseId} />
        </div>
      );
      break;
    case "lessons":
      activeScreen = (
        <div className="w-full">
          <CategoryForm
            initialData={initialData}
            courseId={initialData.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <ChaptersForm initialData={initialData} courseId={courseId} />
        </div>
      );
      break;
    default:
      activeScreen = (
        <CourseTitleForm initialData={initialData} courseId={courseId} />
      );
      break;
  }

  useEffect(() => {
    const tab = searchParams.get("tab") || "course";
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <>
      <div className="flex space-x-4 bg-gray-200 shadow  mt-5 rounded-tl-lg rounded-tr-lg overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`flex items-center p-4 text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "text-blue-600 bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>
      <div className="w-full bg-white shadow rounded-bl-lg rounded-br-lg overflow-hidden">
        <div className="flex w-full p-6">{activeScreen}</div>
      </div>
    </>
  );
};

export default TabsComponent;
