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
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/utils/api";
import { toast } from "sonner";

const formSchema = z.object({
  product_discount_percent: z.string().optional(),
  product_discount_order_qty: z.string().optional(),
});

const EditProductDiscountForm = ({ initialData, id }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_discount_percent: 0,
      product_discount_order_qty: 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      const emptyFields = Object.entries(values).filter(
        ([key, value]) =>
          (value === undefined || value === null || value === "") &&
          key.startsWith("product_")
      );

      if (emptyFields.length > 0) {
        return toast.error(
          `Please fill in: ${emptyFields
            .map(([key]) => key.replace("product_", ""))
            .join(", ")}`
        );
      }

      const payload = {
        discount_order_qty:
          parseInt(values.product_discount_order_qty, 10) || 0,
        discount_percent: parseInt(values.product_discount_percent, 10) || 0,
      };

      if (
        isNaN(payload.discount_order_qty) ||
        isNaN(payload.discount_percent)
      ) {
        return toast.error("Discount values must be numbers");
      }
      const response = await apiCall("patch", `/product/${id}`, payload);
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
      product_discount_percent: initialData?.discount_percent || "",
      product_discount_order_qty: initialData?.discount_order_qty || "",
    });
  }, [form, form.reset]);

  return (
    <>
      <FormWrapper title="Product Discount" label="Discount in %">
        <div className="flex gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 flex flex-col"
            >
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="product_discount_percent"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Discount</FormLabel>
                        <div className="flex items-center space-y-0 border rounded-[5px] overflow-hidden">
                          <Button className="h-9 hover:bg-slate-600 bg-slate-500 w-[50px] flex items-center justify-center rounded-none">
                            %
                          </Button>
                          <FormControl>
                            <Input
                              placeholder="Discount"
                              className="border-0 focus:shadow-none pl-2"
                              {...field}
                              id="product_discount_percent"
                              maxLength={2}
                              onChange={(e) => {
                                let sanitizedValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                if (
                                  sanitizedValue.startsWith("0") &&
                                  sanitizedValue.length > 1
                                ) {
                                  sanitizedValue = sanitizedValue.slice(1);
                                }
                                field.onChange(sanitizedValue);
                              }}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="product_discount_order_qty"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Orders</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Orders"
                            id="product_discount_order_qty"
                            {...field}
                            maxLength={2}
                            onChange={(e) => {
                              let sanitizedValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              if (
                                sanitizedValue.startsWith("0") &&
                                sanitizedValue.length > 1
                              ) {
                                sanitizedValue = sanitizedValue.slice(1);
                              }
                              field.onChange(sanitizedValue);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-x-2">
                      <Loader2 className=" animate-spin" /> Please wait...
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </FormWrapper>
    </>
  );
};

export default EditProductDiscountForm;
