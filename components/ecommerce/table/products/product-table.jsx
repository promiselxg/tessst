"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Lock, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProductTable } from "@/components/ecommerce/table/products/data-table";
import {
  getAllProducts,
  getInStockProducts,
} from "@/service/ecommerce/productService";
import { useAuth } from "@/context/authProvider";
import { columns } from "@/components/ecommerce/table/products/columns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ProductsTablePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "All Products",
      icon: <Lock className="h-4 w-4 mr-1" />,
      key: "all",
    },
    {
      name: "In Stock",
      icon: <Lock className="h-4 w-4 mr-1" />,
      key: "in_stock",
    },
  ];

  const fetchProducts = useCallback(async (tab) => {
    setLoading(true);
    try {
      let response;
      switch (tab) {
        case "all":
          response = await getAllProducts();
          break;
        case "in_stock":
          response = await getInStockProducts();
          break;
        default:
          response = await getAllProducts();
      }
      setProducts(response.products || []);
    } catch (error) {
      toast.error(`Failed to fetch ${tab} products:`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTabClick = async (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setActiveTab(key);
    await fetchProducts(key);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "all";
    setActiveTab(tab);
    fetchProducts(tab);
  }, [searchParams, fetchProducts]);

  useEffect(() => {
    if (!user?.id) router.replace("/auth/login");
  }, [user?.id, router]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "all":
        return (
          <TableContainer
            title="All Products"
            loading={loading}
            products={products}
            router={router}
          />
        );
      case "in_stock":
        return (
          <TableContainer
            title="In Stock Products"
            loading={loading}
            products={products}
            router={router}
          />
        );
      default:
        return (
          <TableContainer
            title="All Products"
            loading={loading}
            products={products}
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

const TableContainer = ({ title, loading, products, router }) => (
  <div className="w-full bg-white rounded-bl-lg rounded-br-lg overflow-hidden mt-10">
    <div className="flex w-full p-6">
      <div className="container mx-auto bg-white shadow p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>.
          <div>
            <Button
              className="bg-sky-700 transition-all hover:bg-sky-600"
              onClick={() =>
                router.push(`/dashboard/ecommerce/products/create`)
              }
            >
              <PlusIcon />
              Add product
            </Button>
          </div>
        </div>
        <ProductTable columns={columns} data={products} loading={loading} />
      </div>
    </div>
  </div>
);

export default ProductsTablePage;
