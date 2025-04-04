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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  product_manufacturer: z.string().optional(),
});

const EditProductManufacturerForm = ({ manufacturer, id }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_manufacturer: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      const response = await apiCall("patch", `/product/${id}`, {
        manufacturer: values.product_manufacturer,
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
      product_manufacturer: manufacturer || "",
    });
  }, [form, form.reset, manufacturer]);

  return (
    <>
      <FormWrapper title="Product manufacturer" label="this field is optional">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="product_manufacturer"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="product manufacturer" {...field} />
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

export default EditProductManufacturerForm;
