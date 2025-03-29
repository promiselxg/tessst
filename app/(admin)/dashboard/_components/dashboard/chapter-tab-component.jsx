"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Lock, Layout, BookOpen, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CourseChapterTitleForm from "@/components/training/course-chapter-title-form";
import { toast } from "sonner";
import { apiCall } from "@/lib/utils/api";

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
    name: "Media documents",
    icon: <Layout className="h-4 w-4 mr-1" />,
    key: "attachment",
  },
];

const ChapterTabsComponent = ({ initialData, courseId, chapterId }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("chapter");
  const [chapterData, setChapterData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  let activeScreen;

  const fetchChapterData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        "get",
        `/training/course/${courseId}/chapter/${chapterId}`
      );
      setChapterData(response.chapter);
    } catch (error) {
      toast.error("Failed to fetch chapter data");
    } finally {
      setLoading(false);
    }
  }, [courseId, chapterId]);

  const handleTabClick = (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "chapter";
    setActiveTab(tab);
    fetchChapterData();
  }, [searchParams, fetchChapterData]);

  switch (activeTab) {
    case "chapter":
      activeScreen = (
        <CourseChapterTitleForm
          initialData={chapterData}
          courseId={courseId}
          chapterId={chapterId}
          onSuccessfulSubmit={fetchChapterData}
        />
      );
      break;
    case "description":
      activeScreen = <div>chapter description</div>;
      break;
    case "attachment":
      activeScreen = <div>chapter attachment</div>;
      break;
    case "lessons":
      activeScreen = <div>chapter title</div>;
      break;
    default:
      activeScreen = <div>chapter title</div>;
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
        <div className="flex w-full p-6">
          {loading ? <Loader2 className=" animate-spin" /> : activeScreen}
        </div>
      </div>
    </>
  );
};

export default ChapterTabsComponent;
