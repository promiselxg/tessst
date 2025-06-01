"use client";

import { useFormData } from "@/context/form.context";
import ContestRewardForm from "./contest-reward-form";
import ContestCriteriaForm from "./contest-criteria-form";

const ContestRewardCriteriaWrapper = () => {
  const { formData } = useFormData();

  return (
    <>
      {formData?.enableRewards && <ContestRewardForm />}
      {Array.isArray(formData?.rewards) &&
        formData?.enableRewards &&
        formData.rewards.length > 0 &&
        formData.rewards[0]?.position !== "" && <ContestCriteriaForm />}
    </>
  );
};

export default ContestRewardCriteriaWrapper;
