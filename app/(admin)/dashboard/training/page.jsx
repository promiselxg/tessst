import React from "react";
import DashboardHeader from "../_components/dashboard/header";
import CourseDataTable from "@/components/training/table/course/page";

const TrainingPage = () => {
  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Course Dashboard" },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <div className="p-6 bg-[whitesmoke] min-h-screen space-y-4">
        <h1>Course training page</h1>
        <CourseDataTable />
      </div>
    </>
  );
};

export default TrainingPage;
