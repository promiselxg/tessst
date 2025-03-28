"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Lock, Layout, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("chapter");
  let activeScreen;

  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  switch (activeTab) {
    case "chapter":
      activeScreen = <div>chapter title</div>;
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

export default ChapterTabsComponent;
