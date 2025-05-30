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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";

const formSchema = z.object({
  videoUrl: z.string(),
});

const EditProjectVideoUrlForm = ({ id, mediaDoc }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      const response = await apiCall("patch", `/project/${id}`, {
        videoUrl: values.videoUrl,
        mediaType: mediaDoc[0].type || "",
        provider: mediaDoc[0].provider || "",
        id,
      });
      toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  }

  useEffect(() => {
    form.reset({ videoUrl: mediaDoc[0].url || "" });
  }, [form, form.reset, mediaDoc]);

  return (
    <>
      <FormWrapper
        title="Video URL"
        label="Paste a valid and publicly accessible video URL (e.g., from Mux or YouTube). Ensure the video corresponds clearly with the content you're uploading."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="eg: 'Advanced web development"
                      className="shadow"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className=" animate-spin" /> Please wait...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </FormWrapper>
    </>
  );
};

export default EditProjectVideoUrlForm;
