"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Lock, Plus, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/authProvider";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BlogTable } from "./data-table";
import { getAllBlogCategories, getAllPost } from "@/service/blog/blogService";
import { columns } from "./columns";
import { categoryColumns } from "./category/columns";
import { BlogCategoryTable } from "./category/data-table";
import { CreateNewCategory } from "./category/create-new-catgeory-dialog";

const BlogTablePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "Post & Articles",
      icon: <Lock className="h-4 w-4 mr-1" />,
      key: "all",
    },
    {
      name: "Categories",
      icon: <Lock className="h-4 w-4 mr-1" />,
      key: "blog_categories",
    },
  ];

  const fetchBlogPost = useCallback(async (tab) => {
    setLoading(true);
    try {
      let response;
      switch (tab) {
        case "all":
          response = await getAllPost();
          break;
        case "blog_categories":
          response = await getAllBlogCategories();
          break;
        default:
          response = await getAllPost();
      }
      setPosts(response.blogPost || response.categories || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch blog posts"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTabClick = async (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setActiveTab(key);
    await fetchBlogPost(key);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "all";
    setActiveTab(tab);
    fetchBlogPost(tab);
  }, [searchParams, fetchBlogPost]);

  useEffect(() => {
    if (!user?.id) router.replace("/auth/login?callback=/dashboard/blog");
  }, [user?.id, router]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "all":
        return (
          <TableContainer
            title="Post & Articles"
            loading={loading}
            posts={posts}
            router={router}
          />
        );
      case "blog_categories":
        return (
          <CategoriesTable
            title="Blog Categories"
            loading={loading}
            posts={posts}
            activeTab="blog_categories"
            fetchCategories={fetchBlogPost}
          />
        );
      default:
        return (
          <TableContainer
            title="Post & Articles"
            loading={loading}
            posts={posts}
            router={router}
          />
        );
    }
  };

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

      {renderActiveScreen()}
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

const TableContainer = ({ title, loading, posts, router }) => (
  <div className="w-full bg-white rounded-bl-lg rounded-br-lg overflow-hidden mt-10">
    <div className="flex w-full p-6">
      <div className="container mx-auto bg-white shadow p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>.
          <div>
            <Button
              className="bg-sky-700 transition-all hover:bg-sky-600"
              onClick={() => router.push(`/dashboard/blog/create`)}
            >
              <PlusIcon />
              Publish new article
            </Button>
          </div>
        </div>
        <BlogTable columns={columns} data={posts} loading={loading} />
      </div>
    </div>
  </div>
);

const CategoriesTable = ({
  title,
  loading,
  posts,
  activeTab,
  fetchCategories,
}) => (
  <div className="w-full bg-white rounded-bl-lg rounded-br-lg overflow-hidden mt-10">
    <div className="flex w-full p-6">
      <div className="container mx-auto bg-white shadow p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>.
          <div>
            <CreateNewCategory
              fetchCategories={fetchCategories}
              tab={activeTab}
            >
              <Button disabled={loading}>
                <Plus />
                Create new category
              </Button>
            </CreateNewCategory>
          </div>
        </div>
        <BlogCategoryTable
          columns={categoryColumns}
          data={posts}
          loading={loading}
        />
      </div>
    </div>
  </div>
);

export default BlogTablePage;
