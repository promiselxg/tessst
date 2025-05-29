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
  title: z.string().min(10, {
    message: "Project title must be at least 10 characters.",
  }),
});

const ProjectTitleForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: formData.title || "",
    },
  });

  useEffect(() => {
    form.reset({ title: formData.title || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper
        title="Project title"
        label="Enter a descriptive and unique title."
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Project title"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateFormData({ title: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {formErrors
                      .filter((error) => error.path === "title")
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

export default ProjectTitleForm;
