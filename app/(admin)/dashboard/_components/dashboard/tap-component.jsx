"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Lock, Layout, BookOpen } from "lucide-react";

const tabs = [
  { name: "Course", icon: <Lock className="h-4 w-4 mr-1" />, key: "course" },
  { name: "Meta", icon: <Layout className="h-4 w-4 mr-1" />, key: "meta" },
  {
    name: "Lessons",
    icon: <BookOpen className="h-4 w-4 mr-1" />,
    key: "lessons",
  },
];

const TabsComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = searchParams.get("tab") || "course";

  const handleTabClick = (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="border-t-[1px] flex space-x-4 bg-gray-100 shadow  mt-5">
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
      <div className="w-full h-[500px] bg-white shadow">name</div>
    </>
  );
};

export default TabsComponent;
