"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BookDashed, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/authProvider";
import { toast } from "sonner";
import { CategoryDataTable } from "./data-table";
import { BiCart } from "react-icons/bi";

import {
  getAllCourseCategories,
  getAllProductCategories,
} from "@/service/category/categoryService";
import { useCategoryColumns } from "./useCategoryColumns";
import { useCourseCategoryColumns } from "./useCourseCategoryColumns";
import { Button } from "@/components/ui/button";

import { CreateNewCategory } from "./create-new-catgeory-dialog";

const CategoryTable = () => {
  const { user } = useAuth();
  const productColumns = useCategoryColumns();
  const courseColumns = useCourseCategoryColumns();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("store");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeColumn, setActiveColumn] = useState(productColumns || "");

  const tabs = [
    {
      name: "Product Categories",
      icon: <BiCart className="h-4 w-4 mr-1" />,
      key: "store",
    },
    {
      name: "Course Categories",
      icon: <BookDashed className="h-4 w-4 mr-1" />,
      key: "training",
    },
  ];

  const fetchCategories = useCallback(async (tab) => {
    setLoading(true);
    try {
      let response;
      switch (tab) {
        case "store":
          response = await getAllProductCategories();
          break;
        default:
          response = await getAllCourseCategories();
      }
      setCategories(response.categories || []);
    } catch (error) {
      toast.error(`Failed to fetch ${tab} category:`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTabClick = async (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setActiveTab(key);
    setActiveColumn(key === "store" ? productColumns : courseColumns);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "store";
    setActiveTab(tab);
    setActiveColumn(tab === "store" ? productColumns : courseColumns);
    fetchCategories(tab);
  }, [searchParams, fetchCategories]);

  useEffect(() => {
    if (!user?.id) router.replace("/auth/login?callback=/dashboard/category");
  }, [user?.id, router]);

  return (
    <>
      <div className="flex space-x-4 mt-5">
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            onClick={() => handleTabClick(tab.key)}
          />
        ))}
      </div>

      <TableContainer
        title={
          activeTab === "store" ? "Product Categories" : "Course Categories"
        }
        loading={loading}
        categories={categories}
        columns={activeColumn}
        activeTab={activeTab === "store" ? "store" : "training"}
        fetchCategories={fetchCategories}
      />
    </>
  );
};

const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 p-4 text-sm transition-all ${
      isActive
        ? "text-blue-600 bg-transparent border-b-[2px] border-indigo-500"
        : "text-gray-400 hover:text-gray-700 border-b-[2px] border-transparent"
    }`}
  >
    {tab.icon} {tab.name}
  </button>
);

const TableContainer = ({
  title,
  loading,
  categories,
  columns,
  activeTab,
  fetchCategories,
}) => (
  <div className="w-full bg-white rounded-bl-lg rounded-br-lg overflow-hidden mt-10">
    <div className="flex w-full p-6">
      <div className="container mx-auto bg-white shadow p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <CreateNewCategory tab={activeTab} fetchCategories={fetchCategories}>
            <Button disabled={loading}>
              <Plus />
              Create new category
            </Button>
          </CreateNewCategory>
        </div>
        <CategoryDataTable
          columns={columns}
          data={categories}
          loading={loading}
        />
      </div>
    </div>
  </div>
);

export default CategoryTable;
