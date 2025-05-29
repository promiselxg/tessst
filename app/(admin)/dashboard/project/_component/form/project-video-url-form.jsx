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
  videoUrl: z.string(),
});

const ProjectVideoUrlForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: formData.videoUrl || "",
    },
  });

  useEffect(() => {
    form.reset({ videoUrl: formData.videoUrl || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper
        title="Video URL"
        label="Paste a valid and publicly accessible video URL (e.g., from Mux or YouTube). Ensure the video corresponds clearly with the content you're uploading."
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Video URL"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateFormData({ videoUrl: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {formErrors
                      .filter((error) => error.path === "videoUrl")
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

export default ProjectVideoUrlForm;
