"use client";

import FileUpload from "@/components/image/upload";
import FormWrapper from "./form-wrapper";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (newFiles, field) => {
    setFiles({ ...files, [field]: newFiles });
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                      src={img.public_url}
                      width={200}
                      height={200}
                      alt={img.assetId}
                      className="w-[150px] h-[100px] bg-contain rounded-[8px]"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <FileUpload
          onChange={(files) => handleFileChange(files, "product_main_image")}
          total={1}
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
            >
              {loading ? (
                <>
                  <Loader2 className=" animate-spin" /> Please wait...
                </>
              ) : (
                "Update image"
              )}
            </Button>
          </div>
        )}
      </FormWrapper>
      {product_main_image?.length > 0 && (
        <FormWrapper
          title="Product Gallery"
          label="Add Product Gallery Images, Maximum files (6)"
        >
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(!files.product_images || files.product_images.length === 0) &&
                Array.isArray(product_images) &&
                product_images.map((img) => (
                  <div
                    key={img.assetId}
                    className="relative flex w-full justify-between items-center my-2 border border-dashed p-[4px] rounded-[8px] border-[rgba(0,0,0,0.2)]"
                  >
                    <div className="flex gap-3">
                      <Image
                        src={img.public_url}
                        width={200}
                        height={200}
                        alt={img.assetId}
                        className="w-[150px] h-[100px] bg-contain rounded-[8px]"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <FileUpload
            onChange={(files) => handleFileChange(files, "product_images")}
            total={6}
          />
          {files?.product_images?.length > 0 && (
            <div className="py-3">
              <Button
                onClick={() =>
                  handleImageUpdate(files?.product_images, "product_images")
                }
              >
                {loading ? (
                  <>
                    <Loader2 className=" animate-spin" /> Please wait...
                  </>
                ) : (
                  "Update image"
                )}
              </Button>
            </div>
          )}
        </FormWrapper>
      )}
    </>
  );
};

export default EditProductImageUploadForm;
