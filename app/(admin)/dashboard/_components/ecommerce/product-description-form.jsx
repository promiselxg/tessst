"use client";
import React, { useEffect } from "react";
import FormWrapper from "./form-wrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useFormData } from "@/context/form.context";
import Editor from "@/components/editor/editor";

const formSchema = z.object({
  product_description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
});

const ProductDescriptionForm = () => {
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_description: formData.product_description || "",
    },
  });

  useEffect(() => {
    form.reset({ product_description: formData.product_description || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper
        title="Product Description"
        label="Provide a detailed description of the product. This will help customers understand the product better."
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="product_description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Editor
                      className="h-full md:h-[300px]"
                      height="h-full md:h-[350px]"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        updateFormData({ product_description: value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </Form>
      </FormWrapper>
    </>
  );
};

export default ProductDescriptionForm;
