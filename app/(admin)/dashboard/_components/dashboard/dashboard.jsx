"use client";

import { useAuth } from "@/context/authProvider";
import { redirect } from "next/navigation";
import React from "react";

const DashboardMenu = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) redirect("/auth/login");
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[--app-primary-bg]">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 pt-5">
          <div className="aspect-video rounded-xl bg-white shadow border border-[rgba(0,0,0,0.1)]" />
          <div className="aspect-video rounded-xl bg-white shadow border border-[rgba(0,0,0,0.1)]" />
          <div className="aspect-video rounded-xl bg-white shadow border border-[rgba(0,0,0,0.1)]" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-white shadow border border-[rgba(0,0,0,0.1)] h-[100vh]" />
      </div>
    </>
  );
};

export default DashboardMenu;
