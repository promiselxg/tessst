"use client";

import FileUpload from "@/components/image/upload";
import { useFormData } from "@/context/form.context";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";

const BlogImageUploadForm = () => {
  const { updateFormData, formErrors } = useFormData();

  const handleFileChange = (newFiles, field) => {
    updateFormData({ [field]: newFiles });
  };

  return (
    <>
      <FormWrapper
        title="File Upload"
        label="Images should be in JPG, PNG, or GIF format and should not exceed 5MB each. You can upload up to 6 images. The first image will be used as the main product image."
      >
        <FileUpload
          onChange={(files) => handleFileChange(files, "images")}
          total={6}
          field={"images"}
        />
        <p className=" text-[0.8rem] font-medium text-destructive py-2">
          {formErrors
            .filter((error) => error.path === "images")
            .map((error, index) => (
              <span key={index}>{error.message}</span>
            ))}
        </p>
      </FormWrapper>
    </>
  );
};

export default BlogImageUploadForm;
