import React from "react";
import DashboardHeader from "../../_components/dashboard/header";
import ContestTitleForm from "../_component/form/contest-title-form";
import ContestDescriptionForm from "../_component/form/contest-description-form";
import ContestFileUpload from "../_component/form/contest-file-upload-form";
import ContestStartDate from "../_component/form/contest-start-date-form";
import ContestEndDateForm from "../_component/form/contest-end-date-form";
import ContestRulesForm from "../_component/form/contest-rules-form";
import ContestRewardCheckBox from "../_component/form/contest-reward-checkbox";
import ContestRewardCriteriaWrapper from "../_component/form/contest-reward-criteria-wrapper";
import ContestSubmitButton from "../_component/form/contest-submit-form-button";

export const metadata = {
  title: "Admin Dashboard | New Competition",
  keywords: "admin, dashboard, Competition, create, new Competition",
  description: "Generated by create next app",
};

const NewCompetition = () => {
  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Competitions", href: "/dashboard/contest" },
    { name: "New Competition" },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <div className="p-6 bg-[whitesmoke] space-y-4">
        <h1 className="font-bold text-[20px]">Create a new Competition</h1>
        <div className="w-full flex md:flex-row flex-col gap-5 justify-between">
          <div className="w-full space-y-5  h-fit ">
            <ContestTitleForm />
            <ContestDescriptionForm />
            <ContestFileUpload />
            <div className="w-full flex gap-6 items-center">
              <ContestStartDate />
              <ContestEndDateForm />
            </div>
            <ContestRulesForm />
            <ContestRewardCheckBox />
            <ContestRewardCriteriaWrapper />
            <ContestSubmitButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCompetition;
