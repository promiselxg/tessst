"use client";

import FileUpload from "@/components/image/upload";
import FormWrapper from "./form-wrapper";
import { useFormData } from "@/context/form.context";

const ProductImageUploadForm = () => {
  const { updateFormData, formErrors } = useFormData();

  const handleFileChange = (newFiles, field) => {
    updateFormData({ [field]: newFiles });
  };

  return (
    <>
      <FormWrapper title="Product Gallery" label="Add Product main Image.">
        <FileUpload
          onChange={(files) => handleFileChange(files, "product_main_image")}
          total={1}
          field={"product_main_image"}
        />
        <p className=" text-[0.8rem] font-medium text-destructive py-2">
          {formErrors
            .filter((error) => error.path === "product_main_image")
            .map((error, index) => (
              <span key={index}>{error.message}</span>
            ))}
        </p>
      </FormWrapper>
      <FormWrapper
        title="Product Gallery"
        label="Add Product Gallery Images, Maximum files (6)"
      >
        <FileUpload
          onChange={(files) => handleFileChange(files, "product_images")}
          total={6}
          field={"product_images"}
        />
        <p className=" text-[0.8rem] font-medium text-destructive py-2">
          {formErrors
            .filter((error) => error.path === "product_images")
            .map((error, index) => (
              <span key={index}>{error.message}</span>
            ))}
        </p>
      </FormWrapper>
    </>
  );
};

export default ProductImageUploadForm;
