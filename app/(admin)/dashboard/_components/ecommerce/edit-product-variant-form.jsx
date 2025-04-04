"use client";
import React, { useEffect, useState } from "react";
import FormWrapper from "./form-wrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Loader2, PlusIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiCall } from "@/lib/utils/api";
import { useRouter } from "next/navigation";
import { AVAILABLE_VARIANT_OPTIONS } from "@/lib/contansts/productVariant";

const variantSchema = z
  .object({
    product_variant_size: z.string().optional(),
    product_variant_color: z.string().optional(),
  })
  .optional();

const EditProductVarientForm = ({ product_variants = [], id }) => {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const [variants, setVariants] = useState(() => {
    if (Array.isArray(product_variants) && product_variants.length > 0) {
      return product_variants.map(({ id, name, value }) => ({
        id,
        name,
        value,
      }));
    } else {
      return [{ id: Date.now() + Math.random(), name: "", value: "" }];
    }
  });

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { id: Date.now() + Math.random(), name: "", value: "" },
    ]);
  };

  const handleRemoveVariant = (id) => {
    // Filter out the variant to be removed
    const updatedVariants = variants.filter((variant) => variant.id !== id);
    setVariants(updatedVariants);

    // Remove the variant from formData.product_variants
    const updatedVariantData = updatedVariants
      .filter((v) => v.name && v.value) // Ensure valid entries
      .map((v) => ({
        product_variant_name:
          v.name === "product_variant_size" ? "Size" : "Color",
        product_variant_value: v.value,
      }));

    setFormData({ ...formData, product_variants: updatedVariantData });
  };

  const handleUpdateVariant = (id, key, value) => {
    // Prevent duplicate variant types
    if (
      key === "name" &&
      variants.some((v) => v.name === value && v.id !== id)
    ) {
      toast.error("This variant is already added!");
      return;
    }

    // Update the variant in the state
    const updatedVariants = variants.map((variant) =>
      variant.id === id ? { ...variant, [key]: value } : variant
    );

    setVariants(updatedVariants);

    // Format the data correctly as an array of objects
    const formattedVariants = updatedVariants
      .filter((v) => v.name && v.value) // Ensure valid entries
      .map((v) => ({
        product_variant_name:
          v.name === "product_variant_size" ? "Size" : "Color",
        product_variant_value: v.value,
      }));

    // Update form data
    setFormData({
      ...formData,
      product_variants: formattedVariants,
    });
  };

  const form = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      product_variant_color: "",
      product_variant_size: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      const response = await apiCall("patch", `/product/${id}`, {
        variants,
      });
      toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormWrapper
          title="Product Variants (optional)"
          label="This helps in organizing and filtering products effectively."
        >
          <div className="flex flex-col gap-4">
            {variants.map((variant) => {
              const usedNames = variants
                .filter((v) => v.id !== variant.id)
                .map((v) => v.name);

              const variantOptions = AVAILABLE_VARIANT_OPTIONS.filter(
                (name) => !usedNames.includes(name) || name === variant.name
              );
              return (
                <div key={variant.id} className="flex gap-4 items-center">
                  <FormField
                    control={form.control}
                    name={`variant_name_${variant.id}`}
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleUpdateVariant(variant.id, "name", value);
                          }}
                          disabled={isSubmitting}
                          value={variant.name}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select variant type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {variantOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option.charAt(0).toUpperCase() +
                                  option.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variant_value_${variant.id}`}
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormControl>
                          <Input
                            placeholder="Enter value"
                            value={variant.value}
                            disabled={isSubmitting}
                            onChange={(e) => {
                              const sanitizedValue = e.target.value.replace(
                                /[^0-9a-zA-Z,]/g,
                                ""
                              );
                              field.onChange(sanitizedValue);
                              handleUpdateVariant(
                                variant.id,
                                "value",
                                sanitizedValue
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remove Button */}
                  {variants.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-transparent text-red-700 hover:bg-transparent"
                      onClick={() => handleRemoveVariant(variant.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}

            {/* Add Another Variant Button */}
            <Button
              onClick={() => handleAddVariant()}
              type="button"
              disabled={isSubmitting}
              className="flex gap-2 items-center text-sm font-bold text-sky-600 w-fit bg-transparent shadow-none hover:bg-transparent"
            >
              <PlusIcon className="h-4 w-4" />
              <span className="text-sm text-sky-600">Add another option</span>
            </Button>
            <div className="flex items-center gap-x-2">
              <Button
                type="submit"
                disabled={
                  !isValid ||
                  isSubmitting ||
                  variants.some((variant) => !variant.value?.trim())
                }
                className="cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className=" animate-spin" /> Please wait...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        </FormWrapper>
      </form>
    </Form>
  );
};

export default EditProductVarientForm;
