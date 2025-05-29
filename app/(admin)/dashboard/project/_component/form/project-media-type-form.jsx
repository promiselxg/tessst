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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFormData } from "@/context/form.context";

import FormWrapper from "../../../_components/ecommerce/form-wrapper";

const formSchema = z.object({
  categoryId: z.string(),
});

const ProjectMediaTypeForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mediaType: formData.mediaType || "",
    },
  });

  useEffect(() => {
    form.reset({ mediaType: formData.mediaType || "" });
  }, [form, formData, form.reset]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData({ mediaType: value.mediaType });
    });

    return () => subscription.unsubscribe();
  }, [form, form.watch, updateFormData]);

  return (
    <>
      <FormWrapper title="Media Type" label="Select media type">
        <Form {...form}>
          <FormField
            control={form.control}
            name="mediaType"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="video">VIDEO</SelectItem>
                    <SelectItem value="image">IMAGE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage>
                  {formErrors
                    .filter((error) => error.path === "mediaType")
                    .map((error, index) => (
                      <span key={index}>{error.message}</span>
                    ))}
                </FormMessage>
              </FormItem>
            )}
          />
        </Form>
      </FormWrapper>
    </>
  );
};

export default ProjectMediaTypeForm;
