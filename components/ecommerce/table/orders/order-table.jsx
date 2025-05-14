"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/authProvider";
import { toast } from "sonner";
import { getAllOrders } from "@/service/ecommerce/orderService";
import { OrderTable } from "./data-table";
import { columns } from "./columns";

const OrdersTable = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "All Orders",
      icon: <Lock className="h-4 w-4 mr-1" />,
      key: "all",
    },
  ];

  const fetchAllOrders = useCallback(async (tab) => {
    setLoading(true);
    try {
      let response;
      switch (tab) {
        case "all":
          response = await getAllOrders();
          break;
        default:
          response = await getAllOrders();
      }
      setOrders(response.orders || []);
    } catch (error) {
      toast.error(`Failed to fetch ${tab} Orders:`, error);
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
    fetchAllOrders(tab);
  }, [searchParams, fetchAllOrders]);

  useEffect(() => {
    if (!user?.id) router.replace("/auth/login");
  }, [user?.id, router]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "all":
        return (
          <TableContainer
            title="All Orders"
            loading={loading}
            orders={orders}
            router={router}
          />
        );
      default:
        return (
          <TableContainer
            title="All Orders"
            loading={loading}
            orders={orders}
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

const TableContainer = ({ title, loading, orders, router }) => (
  <div className="w-full bg-white rounded-bl-lg rounded-br-lg overflow-hidden mt-10">
    <div className="flex w-full p-6">
      <div className="container mx-auto bg-white shadow p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>.
        </div>
        <OrderTable columns={columns} data={orders} loading={loading} />
      </div>
    </div>
  </div>
);

export default OrdersTable;
