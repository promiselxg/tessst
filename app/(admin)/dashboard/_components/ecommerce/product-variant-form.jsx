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
import { AVAILABLE_VARIANT_OPTIONS } from "@/lib/contansts/productVariant";

const variantSchema = z.object({
  product_variant_name: z.string().min(1, "Required"),
  product_variant_value: z.string().min(1, "Required"),
});

const ProductVarientForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const [variants, setVariants] = useState(() => {
    return Array.isArray(formData.variants) && formData.variants.length > 0
      ? formData.variants.map((variant) => ({
          ...variant,
          id: Date.now() + Math.random(),
        }))
      : [{ id: Date.now() + Math.random(), name: "", value: "" }];
  });

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { id: Date.now() + Math.random(), name: "", value: "" },
    ]);
  };

  const handleRemoveVariant = (id) => {
    const updatedVariants = variants.filter((v) => v.id !== id);
    setVariants(updatedVariants);
    updateFormData({
      variants: updatedVariants.map(({ id, ...rest }) => rest),
    });
  };

  const handleUpdateVariant = (id, key, value) => {
    if (
      key === "name" &&
      variants.some((v) => v.name === value && v.id !== id)
    ) {
      toast.error("This variant is already added!");
      return;
    }

    const updatedVariants = variants.map((v) =>
      v.id === id ? { ...v, [key]: value } : v
    );
    setVariants(updatedVariants);

    const variantsObject = updatedVariants.reduce((acc, curr) => {
      if (curr.name) {
        acc[curr.name] = curr.value;
      }
      return acc;
    }, {});
    updateFormData({ variants: variantsObject });
  };

  const form = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {},
  });

  return (
    <Form {...form}>
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
                              {option.charAt(0).toUpperCase() + option.slice(1)}
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
                          onChange={(e) => {
                            const sanitized = e.target.value.replace(
                              /[^0-9a-zA-Z,]/g,
                              ""
                            );
                            field.onChange(sanitized);
                            handleUpdateVariant(variant.id, "value", sanitized);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
          <span className="text-sm text-red-500">
            {formErrors
              .filter((error) => error.path === "variants")
              .map((error, index) => (
                <span key={index}>{error.message}</span>
              ))}
          </span>
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
  );
};

export default ProductVarientForm;
