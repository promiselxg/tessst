"use client";
import React, { useEffect } from "react";
import FormWrapper from "./form-wrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_title: formData.product_title || "",
    },
  });

  useEffect(() => {
    form.reset({ product_title: formData.product_title || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper title="Product title">
        <Form {...form}>
          <FormField
            control={form.control}
            name="product_title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
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
                  <FormDescription>
                    Enter a descriptive and unique title for your product. This
                    will help customers identify your product easily.
                  </FormDescription>
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

export default ProductTitleForm;
