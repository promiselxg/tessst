"use client";
import React, { useEffect, useState } from "react";
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

import { Combobox } from "@/components/ui/combobox";
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  categoryId: z.string(),
});

const CategoryForm = ({
  initialData,
  courseId,
  options,
  onSuccessfulSubmit,
}) => {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const response = await apiCall("PATCH", `/training/course/${courseId}`, {
        categoryId: values.categoryId,
        userId: user.id,
      });

      if (response) {
        toast.success(response.message);
        window.location.reload();
      }
    } catch (error) {
      toast?.error("Something went wrong!", {
        description: `${error?.response?.data?.message}`,
      });
    }
  };

  useEffect(() => {
    form.reset({ categoryId: initialData?.categoryId || "" });
  }, [initialData, form, options]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course category</FormLabel>
                <FormControl>
                  <Combobox options={options} {...field} />
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
                  <Loader2 className="animate-spin" /> Please wait...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
