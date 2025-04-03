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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiCall } from "@/lib/utils/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  product_price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format.")
    .transform((val) => parseFloat(val)),
});

const EditProductPriceForm = ({ product_price, id }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_price: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      const response = await apiCall("patch", `/product/${id}`, {
        price: values.product_price,
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
    form.reset({ product_price: product_price || "" });
  }, [form, form.reset]);

  return (
    <>
      <FormWrapper
        title="Product price"
        label="Enter the price of the product."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="product_price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="price"
                        {...field}
                        id="product_price"
                        onChange={(e) => {
                          let value = e.target.value;
                          let sanitizedValue = value.replace(/[^0-9.]/g, "");
                          const parts = sanitizedValue.split(".");
                          if (parts.length > 2) {
                            sanitizedValue =
                              parts[0] + "." + parts.slice(1).join("");
                          }
                          if (sanitizedValue.includes(".")) {
                            const decimalParts = sanitizedValue.split(".");
                            if (decimalParts[1].length > 2) {
                              sanitizedValue =
                                decimalParts[0] +
                                "." +
                                decimalParts[1].substring(0, 2);
                            }
                          }
                          field.onChange(sanitizedValue);
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

export default EditProductPriceForm;
