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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormData } from "@/context/form.context";

const formSchema = z.object({
  product_title: z.string().min(10, {
    message: "Product title must be at least 10 characters.",
  }),
});

const ProductTitleForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_title: formData.product_title || "",
    },
  });

  useEffect(() => {
    form.reset({ product_title: formData.product_title || "" });
  }, [form, formData, form.reset]);

  console.log(formData);
  return (
    <>
      <FormWrapper
        title="Product title"
        label="Enter a descriptive and unique title for your product. This will help customers identify your product easily."
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="product_title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="product title"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateFormData({ product_title: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {formErrors
                      .filter((error) => error.path === "product_title")
                      .map((error, index) => (
                        <span key={index}>{error.message}</span>
                      ))}
                  </FormMessage>
                </FormItem>
              );
            }}
          />
        </Form>
      </FormWrapper>
    </>
  );
};

export default ProductTitleForm;
