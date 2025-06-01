"use client";

import FileUpload from "@/components/image/upload";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageToCloudinary";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useFormData } from "@/context/form.context";
import EditProjectVideoUrlForm from "./edit-project-video-url-form";

const cloudinaryUrl = "https://api.cloudinary.com/v1_1/promiselxg/image/upload";
const upload_preset = "ysfon_image";
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

const EditProjectFileUploadForm = ({ mediaDoc, id }) => {
  const { formData } = useFormData();
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleFileChange = (newFiles, field) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [field]: newFiles,
    }));
  };

  const handleImageUpdate = async (file) => {
    try {
      setLoading(true);
      const { photos } = await uploadImagesToCloudinary(
        file,
        cloudinaryUrl,
        upload_preset,
        apiKey
      );

      const preparedData = prepareProductData({ photos });

      const response = await apiCall("patch", `/project/${id}`, {
        ...preparedData,
        oldImage: mediaDoc,
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

  const prepareProductData = ({ photos }) => {
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

    return { mediaDoc: formattedPhotos };
  };

  return (
    <>
      {formData.mediaType === "image" && (
        <FormWrapper
          title="File Upload"
          label="Images should be in JPG, PNG, or GIF format and should not exceed 5MB each. You can upload up to 6 images. The first image will be used as the main product image."
        >
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {(!files.images || files.images.length === 0) &&
                Array.isArray(mediaDoc) &&
                mediaDoc.map((img, i) => (
                  <div
                    key={img.assetId || i}
                    className="relative flex w-full justify-between items-center my-2 border border-dashed p-[4px] rounded-[8px] border-[rgba(0,0,0,0.2)]"
                  >
                    <div className="flex gap-3">
                      <Image
                        src={img.public_url ?? "/default-placeholder.png"}
                        width={102}
                        height={80}
                        alt={img.assetId || `default-image-${i}`}
                        className="w-[102px] h-[80px] bg-contain"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <FileUpload onChange={handleFileChange} total={6} field="images" />
          {files?.images?.length > 0 && (
            <div className="py-3">
              <Button
                disabled={loading}
                onClick={() => handleImageUpdate(files?.images, "images")}
              >
                {loading ? (
                  <>
                    <Loader2 className=" animate-spin" /> Please wait...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          )}
        </FormWrapper>
      )}
      {formData?.mediaType === "video" && (
        <EditProjectVideoUrlForm mediaDoc={mediaDoc} id={id} />
      )}
    </>
  );
};

export default EditProjectFileUploadForm;
