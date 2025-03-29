"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";

import { useAuth } from "@/context/authProvider";
import { redirect } from "next/navigation";
import Editor from "../editor/editor";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "course description is required",
  }),
});

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
  onSuccessfulSubmit,
}) => {
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const response = await apiCall(
        "PATCH",
        `/training/course/${courseId}/chapter/${chapterId}`,
        {
          description: values.description,
        }
      );
      if (response) {
        toast.success(`${response.message}`);
        onSuccessfulSubmit();
      }
    } catch (error) {
      toast?.error("Something went wrong!", {
        description: `${error?.response?.data?.message}`,
      });
    }
  };

  if (!user) {
    redirect(`/auth/login`);
  }
  console.log(initialData);
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-slate-700">
                  Chapter description
                </FormLabel>
                <FormControl>
                  <Editor {...field} />
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
                  <Loader2 className=" animate-spin" /> please wait...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChapterDescriptionForm;
