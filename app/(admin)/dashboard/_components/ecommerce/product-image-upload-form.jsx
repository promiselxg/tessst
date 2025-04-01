"use client";

import FileUpload from "@/components/image/upload";
import FormWrapper from "./form-wrapper";
import { useFormData } from "@/context/form.context";

const ProductImageUploadForm = () => {
  const { updateFormData } = useFormData();

  const handleFileChange = (newFiles, field) => {
    updateFormData({ [field]: newFiles });
  };

  return (
    <>
      <FormWrapper title="Product Gallery" label="Add Product main Image.">
        <FileUpload
          onChange={(files) => handleFileChange(files, "product_main_image")}
          total={1}
        />
      </FormWrapper>

      <FormWrapper
        title="Product Gallery"
        label="Add Product Gallery Images, Maximum files (6)"
      >
        <FileUpload
          onChange={(files) => handleFileChange(files, "product_images")}
          total={6}
        />
      </FormWrapper>
    </>
  );
};

export default ProductImageUploadForm;
