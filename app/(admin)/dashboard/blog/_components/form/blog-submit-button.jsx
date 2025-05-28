"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { useFormData } from "@/context/form.context";
import { blogSchema, extractValidationErrors } from "@/lib/schema/blogSchema";

import { sanitizeInput } from "@/lib/utils/regExpression";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageToCloudinary";
import { createNewPost } from "@/service/blog/blogService";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const BlogSubmitButton = () => {
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
      setLoading(true);

      // Validate product data
      blogSchema.parse(formData);

      // Upload images to Cloudinary
      const [uploadedImages] = await Promise.all([
        uploadImagesToCloudinary(
          formData.images,
          cloudinaryUrl,
          upload_preset,
          apiKey
        ),
      ]);

      const preparedData = prepareBlogData({
        formData,
        blogImages: uploadedImages?.photos || [],
      });

      const response = await createNewPost(preparedData);
      toast.success(response.message || "Blog post created successfully");
      clearFormData();

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      router.replace(`/dashboard/blog`);
    } catch (error) {
      handleFormErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormErrors = async (error) => {
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

  const prepareBlogData = ({ formData, blogImages }) => {
    return {
      title: sanitizeInput(formData.blog_title),
      content: sanitizeInput(formData.content),
      images:
        blogImages?.map((img) => ({
          assetId: img?.asset_id,
          publicId: img?.public_id,
          public_url: img?.secure_url,
          format: img?.format,
          resource_type: img?.resource_type,
          original_filename: img?.original_filename,
        })) || [],
      categoryId: formData.categoryId,
      isPublished: true,
      author: user.username || "Admin",
    };
  };

  return (
    <Button
      onClick={handleProductSubmit}
      disabled={loading}
      className="bg-sky-700 hover:bg-sky-600 text-white  h-10"
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin" />
          Please wait...
        </div>
      ) : (
        "Save and Publish Post"
      )}
    </Button>
  );
};

export default BlogSubmitButton;
