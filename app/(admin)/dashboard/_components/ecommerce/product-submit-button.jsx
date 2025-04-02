"use client";

import { Button } from "@/components/ui/button";
import { useFormData } from "@/context/form.context";
import {
  extractValidationErrors,
  productSchema,
} from "@/lib/schema/productSchema";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageToCloudinary";
import { addNewProduct } from "@/service/ecommerce/productService";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const ProductSubmitButton = () => {
  const { formData, updateFormErrors } = useFormData();
  const [loading, setLoading] = useState(false);

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/promiselxg/image/upload";
  const upload_preset = "ysfon_image";
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  const handleProductSubmit = async () => {
    try {
      setLoading(true);

      // Validate product data
      const validatedProduct = productSchema.parse(formData);
      console.log("Validated Data:", validatedProduct);

      // Upload images to Cloudinary
      const [productMainPhoto, productImages] = await Promise.all([
        uploadImagesToCloudinary(
          formData.product_main_image,
          cloudinaryUrl,
          upload_preset,
          apiKey
        ),
        uploadImagesToCloudinary(
          formData.product_images,
          cloudinaryUrl,
          upload_preset,
          apiKey
        ),
      ]);

      console.log("Cloudinary Product Main Photo:", productMainPhoto.photos);
      console.log("======================================");
      console.log("Cloudinary Product Images:", productImages.photos);

      const preparedData = prepareProductData({
        formData,
        product_main_photo: productMainPhoto.photos,
        product_images: productImages.photos,
      });

      const response = await addNewProduct(preparedData);
      console.log(response);
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
    } else {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  };

  const prepareProductData = (formData) => {
    const {
      formData: productData,
      product_main_photo,
      product_images,
    } = formData;

    return {
      name: productData.product_title,
      description: productData.product_brief_description,
      full_description: productData.product_description,
      price: parseFloat(productData.product_price),
      categoryId: productData.product_category,
      stock: Number(productData.product_stock_qty),
      discount_order_qty: Number(productData.product_discount_order_qty),
      discount_percent: Number(productData.product_discount_percent),
      manufacturer: productData.product_manufacturer,
      tags: productData.product_tag,
      product_variants: {
        color: productData.variants?.product_variant_color || "",
        size: productData.variants?.product_variant_size || "",
      },
      product_main_image: product_main_photo.map((img) => ({
        assetId: img.asset_id,
        publicId: img.public_id,
        public_url: img.secure_url,
        format: img.format,
        resource_type: img.resource_type,
        original_filename: img.original_filename,
      })),
      product_images: product_images.map((img) => ({
        assetId: img.asset_id,
        publicId: img.public_id,
        public_url: img.secure_url,
        format: img.format,
        resource_type: img.resource_type,
        original_filename: img.original_filename,
      })),
    };
  };

  return (
    <>
      <Button
        onClick={() => handleProductSubmit()}
        disabled={loading}
        className="bg-sky-700 hover:bg-sky-600 text-white w-[150px] h-10"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <Loader2 className=" animate-spin" />
            please wait...
          </div>
        ) : (
          "Submit product"
        )}
      </Button>
    </>
  );
};

export default ProductSubmitButton;
