"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { useFormData } from "@/context/form.context";
import { extractValidationErrors } from "@/lib/schema/blogSchema";
import { contestSchema } from "@/lib/schema/contestSchema";

import { sanitizeInput } from "@/lib/utils/regExpression";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageToCloudinary";
import { createNewCompetition } from "@/service/competition/competitionService";
import { createNewProject } from "@/service/project/projectService";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const ContestSubmitButton = () => {
  const { formData, updateFormErrors, clearFormData, updateFormData } =
    useFormData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/promiselxg/image/upload";
  const upload_preset = "ysfon_image";
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  const handleProductSubmit = async () => {
    try {
      let updatedFormData = formData;

      if (!formData.enableRewards) {
        const { rewards, criteria, rules, ...rest } = formData;
        updatedFormData = rest;
        updateFormData(rest);
      }

      setLoading(true);

      // Validate with updated form data
      contestSchema.parse(updatedFormData);

      let uploadedImages = [];

      [uploadedImages] = await Promise.all([
        uploadImagesToCloudinary(
          updatedFormData.images,
          cloudinaryUrl,
          upload_preset,
          apiKey
        ),
      ]);

      const image = [];

      if (uploadedImages?.photos?.length) {
        uploadedImages.photos.forEach((img) => {
          image.push({
            public_id: img.public_id,
            public_url: img.secure_url,
            asset_id: img.asset_id,
            format: img.format,
            resource_type: img.resource_type,
            original_filename: img.original_filename,
          });
        });
      }

      const preparedData = prepareProjectData({
        formData: updatedFormData,
        image,
      });

      const response = await createNewCompetition(preparedData);
      toast.success(response.message || "Created successfully");
      clearFormData();

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      router.replace(`/dashboard/contest`);
    } catch (error) {
      handleFormErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormErrors = (error) => {
    if (error instanceof z.ZodError) {
      const errorsArray = extractValidationErrors(error.errors);
      updateFormErrors(errorsArray);
      toast.error("Validation errors: please fix the errors and try again");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  };

  const prepareProjectData = ({ formData, image }) => {
    return {
      title: sanitizeInput(formData.title),
      description: sanitizeInput(formData.description),
      image,
      rules: sanitizeInput(formData.rules),
      endDate: formData.endDate,
      startDate: formData.startDate,
      rewards: formData.rewards || null,
      criteria: formData.criteria || null,
      author: user?.username || "Admin",
      enableRewards: formData.enableRewards || false,
    };
  };

  return (
    <Button
      onClick={handleProductSubmit}
      disabled={loading}
      className="bg-sky-700 hover:bg-sky-600 text-white h-10"
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin" />
          Please wait...
        </div>
      ) : (
        "Create new Competition"
      )}
    </Button>
  );
};

export default ContestSubmitButton;
