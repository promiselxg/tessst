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

import { useFormData } from "@/context/form.context";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const variantSchema = z.object({
  product_variant_name: z.string().min(1, "Required"),
  product_variant_value: z.string().min(1, "Required"),
});

const ProductVarientForm = () => {
  const { formData, updateFormData } = useFormData();
  const [variants, setVariants] = useState(() => {
    if (Object.keys(formData.variants || {}).length > 0) {
      return Object.entries(formData.variants).map(([name, value]) => ({
        id: Date.now() + Math.random(),
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
    const updatedVariants = variants.filter((variant) => variant.id !== id);
    setVariants(updatedVariants);

    const updatedVariantData = { ...formData.variants };
    const removedVariant = variants.find((variant) => variant.id === id);
    if (removedVariant) delete updatedVariantData[removedVariant.name];

    updateFormData({ ...formData, variants: updatedVariantData });
  };

  const handleUpdateVariant = (id, key, value) => {
    // Prevent selecting the same variant again
    if (
      key === "name" &&
      variants.some((v) => v.name === value && v.id !== id)
    ) {
      toast.error("This variant is already added!");
      return;
    }

    const updatedVariants = variants.map((variant) =>
      variant.id === id ? { ...variant, [key]: value } : variant
    );
    setVariants(updatedVariants);

    // Ensure variant name exists before updating formData.variants
    const updatedVariantsData = { ...formData.variants };
    const updatedVariant = updatedVariants.find((v) => v.id === id);

    if (updatedVariant?.name) {
      updatedVariantsData[updatedVariant.name] = updatedVariant.value;
    }

    updateFormData({ ...formData, variants: updatedVariantsData });
  };

  const form = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      product_variant_size: formData?.variants?.product_variant_size || "",
      product_variant_color: formData?.variants?.product_variant_color || "",
    },
  });

  useEffect(() => {
    form.reset({
      product_variant_name: formData?.variants?.product_variant_color || "",
      product_variant_size: formData?.variants?.product_variant_size || "",
    });
  }, [
    form,
    formData?.variants?.product_variant_color,
    formData?.variants?.product_variant_size,
  ]);

  return (
    <>
      <Form {...form}>
        <FormWrapper
          title="Product Variants (optional)"
          label="This helps in organizing and filtering products effectively."
        >
          <div className="flex flex-col gap-4">
            {variants.map((variant) => (
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
                        value={variant.name}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select variant type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="product_variant_size">
                            Size
                          </SelectItem>
                          <SelectItem value="product_variant_color">
                            Color
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input for Variant Value */}
                <FormField
                  control={form.control}
                  name={`variant_value_${variant.id}`}
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormControl>
                        <Input
                          placeholder="Enter value"
                          value={variant.value}
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
            ))}

            {/* Add Another Variant Button */}
            <Button
              onClick={handleAddVariant}
              className="flex gap-2 items-center text-sm font-bold text-sky-600 w-fit bg-transparent shadow-none hover:bg-transparent"
            >
              <PlusIcon className="h-4 w-4" />
              <span className="text-sm text-sky-600">Add another option</span>
            </Button>
          </div>
        </FormWrapper>
      </Form>
    </>
  );
};

export default ProductVarientForm;
