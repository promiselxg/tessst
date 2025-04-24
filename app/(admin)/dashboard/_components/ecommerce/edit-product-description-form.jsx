"use client";
import React, { useEffect } from "react";
import FormWrapper from "./form-wrapper";

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

import Editor from "@/components/editor/editor";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiCall } from "@/lib/utils/api";
import CKEditor from "@/components/editor/ckEditor";

const formSchema = z.object({
  product_description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
});

const EditProductDescriptionForm = ({ product_description, id }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_description: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      const response = await apiCall("patch", `/product/${id}`, {
        full_description: values.product_description,
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
    form.reset({ product_description: product_description || "" });
  }, [form, form.reset, product_description]);

  return (
    <>
      <FormWrapper
        title="Product Description"
        label="Provide a detailed description of the product. This will help customers understand the product better."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="product_description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      {/* <CKEditor
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      /> */}
                      <Editor
                        className="h-full md:h-[300px]"
                        height="h-full md:h-[350px]"
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
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

export default EditProductDescriptionForm;
