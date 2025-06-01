"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CalendarCog, Lock, PlusIcon, Trophy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/authProvider";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { admingetAllCompetitions } from "@/service/competition/competitionService";
import { CompetitionDataTable } from "./data-table";
import { columns } from "./columns";

const Table = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [competitions, setCompetition] = useState([]);

  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "Active competitions",
      icon: <Lock className="h-4 w-4 mr-1" />,
      key: "all",
    },
    {
      name: "Expired competitons",
      icon: <CalendarCog className="h-4 w-4 mr-1" />,
      key: "expired",
    },
    {
      name: "Upcoming competitons",
      icon: <Trophy className="h-4 w-4 mr-1" />,
      key: "upcoming",
    },
  ];

  const fetchAllCompetition = useCallback(async (tab) => {
    setLoading(true);
    try {
      let response;
      switch (tab) {
        case "all":
          response = await admingetAllCompetitions("active");
          break;
        case "expired":
          response = await admingetAllCompetitions("expired");
          break;
        case "upcoming":
          response = await admingetAllCompetitions("upcoming");
          break;
        default:
          response = await admingetAllCompetitions("active");
      }
      setCompetition(response.contests || []);
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
    await fetchAllCompetition(key);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "all";
    setActiveTab(tab);
    fetchAllCompetition(tab);
  }, [searchParams, fetchAllCompetition]);

  useEffect(() => {
    if (!user?.id) router.replace("/auth/login?callback=/dashboard/project");
  }, [user?.id, router]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "all":
        return (
          <TableContainer
            title="Active competitions"
            loading={loading}
            data={competitions}
            router={router}
          />
        );
      case "project_categories":
        return <h1>ok</h1>;
      default:
        return (
          <TableContainer
            title="Active competitions"
            loading={loading}
            data={competitions}
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

const TableContainer = ({ title, loading, data, router }) => (
  <div className="w-full bg-white rounded-bl-lg rounded-br-lg overflow-hidden mt-10">
    <div className="flex w-full p-6">
      <div className="container mx-auto bg-white shadow p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>.
          <div>
            <Button
              className="bg-sky-700 transition-all hover:bg-sky-600"
              onClick={() => router.push(`/dashboard/contest/create`)}
              disabled={loading}
            >
              <PlusIcon />
              New Competition
            </Button>
          </div>
        </div>
        <CompetitionDataTable columns={columns} data={data} loading={loading} />
      </div>
    </div>
  </div>
);

export default Table;
