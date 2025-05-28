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

import { useFormData } from "@/context/form.context";
import Editor from "@/components/editor/editor";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";

const formSchema = z.object({
  content: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
});

const BlogDescriptionForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: formData.content || "",
    },
  });

  useEffect(() => {
    form.reset({ content: formData.content || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper title="Description">
        <Form {...form}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    {/* <CKEditor
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        updateFormData({ content: val });
                      }}
                    /> */}
                    <Editor
                      className="h-full md:h-[300px]"
                      height="h-full md:h-[350px]"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        updateFormData({ content: value });
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {formErrors
                      .filter((error) => error.path === "content")
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

export default BlogDescriptionForm;
