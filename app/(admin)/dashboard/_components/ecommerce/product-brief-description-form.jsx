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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormData } from "@/context/form.context";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  product_brief_description: z.string().max(100, {
    message: "Description must be less than 100 characters.",
  }),
});

const ProductBriefDescriptionForm = () => {
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_brief_description: formData.product_brief_description || "",
    },
  });

  useEffect(() => {
    form.reset({
      product_brief_description: formData.product_brief_description || "",
    });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper
        title="Brief Description"
        label="Add short description for product"
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="product_brief_description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief description"
                      className="resize-none"
                      maxLength={100}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateFormData({
                          product_brief_description: e.target.value,
                        });
                      }}
                    ></Textarea>
                  </FormControl>
                  <FormDescription>Maximum of 100 characters.</FormDescription>
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

export default ProductBriefDescriptionForm;
