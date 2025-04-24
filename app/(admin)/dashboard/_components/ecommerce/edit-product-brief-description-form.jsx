"use client";
import React, { useEffect } from "react";
import FormWrapper from "./form-wrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";

const formSchema = z.object({
  product_brief_description: z
    .string()
    .max(100, { message: "A maximum of 100 characters" })
    .min(20, {
      message: "A minimum of 20 characters",
    }),
});

const EditProductBriefDescriptionForm = ({ brief_description, id }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_brief_description: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      const response = await apiCall("patch", `/product/${id}`, {
        description: values.product_brief_description,
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
    form.reset({
      product_brief_description: brief_description || "",
    });
  }, [form, form.reset, brief_description]);

  return (
    <>
      <FormWrapper
        title="Brief Description"
        label="Add short description for product"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="product_brief_description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a brief description"
                        className="resize-none"
                        maxLength={100}
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormDescription>
                      Maximum of 100 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
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

export default EditProductBriefDescriptionForm;
