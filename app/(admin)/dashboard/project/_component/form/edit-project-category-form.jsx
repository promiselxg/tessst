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

import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";

const formSchema = z.object({
  categoryId: z.string().min(1, {
    message: "Product category is required",
  }),
});

const EditProjectCategoryForm = ({ options = [], id }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      const response = await apiCall("patch", `/project/${id}`, {
        categoryId: values.categoryId,
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
    form.reset({ categoryId: options.id || "" });
  }, [form, form.reset, options.id]);

  return (
    <>
      <FormWrapper title="Category" label="Select  category">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
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

export default EditProjectCategoryForm;
