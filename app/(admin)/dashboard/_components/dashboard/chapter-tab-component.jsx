"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Lock, Video } from "lucide-react";
import { useEffect, useState } from "react";
import CourseChapterTitleForm from "@/components/training/course-chapter-title-form";

import ChapterDescriptionForm from "@/components/training/course-chapter-description-form";
import ChapterAccessForm from "@/components/training/course-chapter-access-form";
import ChapterVideoUploadForm from "@/components/training/chapter-video-form";

const tabs = [
  {
    name: "Chapter title",
    icon: <Lock className="h-4 w-4 mr-1" />,
    key: "chapter",
  },
  {
    name: "Chapter description",
    icon: <Lock className="h-4 w-4 mr-1" />,
    key: "description",
  },
  {
    name: "Access setting",
    icon: <Lock className="h-4 w-4 mr-1" />,
    key: "access",
  },
  {
    name: "Media documents",
    icon: <Video className="h-4 w-4 mr-1" />,
    key: "attachment",
  },
];

const ChapterTabsComponent = ({ initialData, courseId, chapterId }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("chapter");

  let activeScreen;

  const handleTabClick = (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "chapter";
    setActiveTab(tab);
  }, [searchParams]);

  switch (activeTab) {
    case "chapter":
      activeScreen = (
        <CourseChapterTitleForm
          initialData={initialData}
          courseId={courseId}
          chapterId={chapterId}
        />
      );
      break;
    case "description":
      activeScreen = (
        <ChapterDescriptionForm
          initialData={initialData}
          courseId={courseId}
          chapterId={chapterId}
        />
      );
      break;
    case "access":
      activeScreen = (
        <ChapterAccessForm
          initialData={initialData}
          courseId={courseId}
          chapterId={chapterId}
        />
      );

      break;
    case "attachment":
      activeScreen = (
        <ChapterVideoUploadForm
          initialData={initialData}
          courseId={courseId}
          chapterId={chapterId}
        />
      );
      break;
    default:
      activeScreen = (
        <CourseChapterTitleForm
          initialData={initialData}
          courseId={courseId}
          chapterId={chapterId}
        />
      );
      break;
  }

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

export default ChapterTabsComponent;
