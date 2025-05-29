"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { useFormData } from "@/context/form.context";
import { extractValidationErrors } from "@/lib/schema/blogSchema";
import { projectSchema } from "@/lib/schema/projectSchema";

import { sanitizeInput } from "@/lib/utils/regExpression";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageToCloudinary";
import { createNewProject } from "@/service/project/projectService";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const ProjectFormSubmitButton = () => {
  const { formData, updateFormErrors, clearFormData } = useFormData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/promiselxg/image/upload";
  const upload_preset = "ysfon_image";
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  const handleProductSubmit = async () => {
    try {
      if (!apiKey) throw new Error("Cloudinary API key is missing.");
      setLoading(true);

      // Validate project data
      projectSchema.parse(formData);

      let uploadedImages = [];

      // Upload images only if mediaType includes image
      if (formData.mediaType === "image") {
        [uploadedImages] = await Promise.all([
          uploadImagesToCloudinary(
            formData.images,
            cloudinaryUrl,
            upload_preset,
            apiKey
          ),
        ]);
      }

      // Prepare mediaDoc combining images and video if any
      const mediaDoc = [];

      if (uploadedImages?.photos?.length) {
        uploadedImages.photos.forEach((img) => {
          mediaDoc.push({
            type: "image",
            public_id: img.public_id,
            public_url: img.secure_url,
            asset_id: img.asset_id,
            format: img.format,
            resource_type: img.resource_type,
            original_filename: img.original_filename,
          });
        });
      }

      if (formData.videoUrl) {
        mediaDoc.push({
          type: "video",
          url: formData.videoUrl,
        });
      }

      const preparedData = prepareProjectData({
        formData,
        mediaDoc,
      });

      const response = await createNewProject(preparedData);
      toast.success(response.message || "Created successfully");
      clearFormData();

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      router.replace(`/dashboard/project`);
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

  const prepareProjectData = ({ formData, mediaDoc }) => {
    return {
      title: sanitizeInput(formData.title),
      description: sanitizeInput(formData.description),
      mediaDoc,
      categoryId: formData.categoryId,
      mediaType: formData.mediaType,
      author: user?.username || "Admin",
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
        "Create Project"
      )}
    </Button>
  );
};

export default ProjectFormSubmitButton;
