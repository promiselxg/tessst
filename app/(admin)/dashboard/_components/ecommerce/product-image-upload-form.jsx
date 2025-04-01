"use client";

import FileUpload from "@/components/image/upload";
import FormWrapper from "./form-wrapper";
import { useFormData } from "@/context/form.context";

const ProductImageUploadForm = () => {
  const { formData, updateFormData } = useFormData();

  const handleFileChange = (newFiles, field) => {
    updateFormData({ [field]: newFiles });
  };

  console.log(formData);

  return (
    <>
      <FormWrapper title="Product Gallery">
        <div className="space-y-3">
          <h1 className="text-[14px] font-bold">Product Image</h1>
          <p className="text-sm italic text-slate-600">
            Add Product main Image.
          </p>
          <FileUpload
            onChange={(files) => handleFileChange(files, "product_main_image")}
            total={1}
          />
        </div>
      </FormWrapper>

      <FormWrapper title="Product Images">
        <div className="space-y-3">
          <h1 className="text-[14px] font-bold">Product Image</h1>
          <p className="text-sm italic text-slate-600">Add Product images.</p>
          <FileUpload
            onChange={(files) => handleFileChange(files, "product_images")}
            total={5}
          />
        </div>
      </FormWrapper>
    </>
  );
};

export default ProductImageUploadForm;
