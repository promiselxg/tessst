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
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";

import { useAuth } from "@/context/authProvider";
import { redirect, useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const ChapterAccessForm = ({ initialData, courseId, chapterId }) => {
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const onSubmit = async (values) => {
    try {
      const response = await apiCall(
        "PATCH",
        `/training/course/${courseId}/chapter/${chapterId}`,
        {
          isFree: values.isFree,
        }
      );
      if (response) {
        toast.success(`${response.message}`);
        router.push(
          `/dashboard/training/course/${courseId}/chapter/${chapterId}?tab=attachment`
        );
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

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="leading-none flex font-bold">
                  <FormDescription className="text-sm italic text-slate-500">
                    Check this box if you want this chapter to be free for
                    preview to all user&apos;s
                  </FormDescription>
                </div>
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

export default ChapterAccessForm;
