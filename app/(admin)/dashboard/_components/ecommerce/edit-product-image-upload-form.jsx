"use client";

import FileUpload from "@/components/image/upload";
import FormWrapper from "./form-wrapper";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageToCloudinary";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const cloudinaryUrl = "https://api.cloudinary.com/v1_1/promiselxg/image/upload";
const upload_preset = "ysfon_image";
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

const EditProductImageUploadForm = ({
  product_main_image,
  product_images,
  id,
}) => {
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (newFiles, field) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [field]: newFiles,
    }));
  };

  const handleImageUpdate = async (file, type) => {
    let oldImage =
      type === "product_main_image" ? product_main_image : product_images;

    try {
      setLoading(true);
      const { photos } = await uploadImagesToCloudinary(
        file,
        cloudinaryUrl,
        upload_preset,
        apiKey
      );

      const preparedData = prepareProductData({ type, photos });

      const response = await apiCall("patch", `/product/${id}`, {
        ...preparedData,
        oldImage,
      });

      toast.success(response.message);
      router.refresh();
      setFiles({});
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Image upload failed, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const prepareProductData = ({ type, photos }) => {
    const formattedPhotos = Array.isArray(photos)
      ? photos.map((img) => ({
          assetId: img?.asset_id,
          publicId: img?.public_id,
          public_url: img?.secure_url,
          format: img?.format,
          resource_type: img?.resource_type,
          original_filename: img?.original_filename,
        }))
      : [];

    return { images: formattedPhotos, type };
  };

  return (
    <>
      <FormWrapper title="Product Gallery" label="Add Product main Image.">
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {(!files.product_main_image ||
              files.product_main_image.length === 0) &&
              Array.isArray(product_main_image) &&
              product_main_image.map((img) => (
                <div
                  key={img.assetId}
                  className="relative flex w-full justify-between items-center my-2 border border-dashed p-[4px] rounded-[8px] border-[rgba(0,0,0,0.2)]"
                >
                  <div className="flex gap-3">
                    <Image
                      src={img.public_url ?? "/public/default-placeholder.png"}
                      width={102}
                      height={80}
                      alt={img.assetId}
                      className="w-[102px] h-[80px] bg-contain"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <FileUpload
          onChange={handleFileChange}
          total={1}
          field="product_main_image"
        />
        {files?.product_main_image?.length > 0 && (
          <div className="py-3">
            <Button
              onClick={() =>
                handleImageUpdate(
                  files?.product_main_image,
                  "product_main_image"
                )
              }
              disabled={loading}
            >
              Update image
            </Button>
          </div>
        )}
      </FormWrapper>
      <FormWrapper
        title="Product Gallery"
        label="Add Product Gallery Images, Maximum files (6)"
      >
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {(!files.product_images || files.product_images.length === 0) &&
              Array.isArray(product_images) &&
              product_images.map((img) => (
                <div
                  key={img.assetId}
                  className="relative flex w-full justify-between items-center my-2 border border-dashed p-[4px] rounded-[8px] border-[rgba(0,0,0,0.2)]"
                >
                  <div className="flex gap-3">
                    <Image
                      src={img.public_url ?? "/public/default-placeholder.png"}
                      width={102}
                      height={80}
                      alt={img.assetId}
                      className="w-[102px] h-[80px] bg-contain"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <FileUpload
          onChange={handleFileChange}
          total={6}
          field="product_images"
        />
        {files?.product_images?.length > 0 && (
          <div className="py-3">
            <Button
              disabled={loading}
              onClick={() =>
                handleImageUpdate(files?.product_images, "product_images")
              }
            >
              Update image
            </Button>
          </div>
        )}
      </FormWrapper>
    </>
  );
};

export default EditProductImageUploadForm;
