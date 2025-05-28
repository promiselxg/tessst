"use client";
import React, { useEffect } from "react";

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
import FormWrapper from "../../../_components/ecommerce/form-wrapper";

const formSchema = z.object({
  blog_title: z.string().min(10, {
    message: "Product title must be at least 10 characters.",
  }),
});

const BlogTitleForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blog_title: formData.blog_title || "",
    },
  });

  useEffect(() => {
    form.reset({ blog_title: formData.blog_title || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper
        title="Blog title"
        label="Enter a descriptive and unique title for your blog."
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="blog_title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="blog title"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateFormData({ blog_title: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {formErrors
                      .filter((error) => error.path === "blog_title")
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

export default BlogTitleForm;
