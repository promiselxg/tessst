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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormData } from "@/context/form.context";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  product_discount_percent: z
    .number()
    .positive({ message: "Discount must be greater than zero." })
    .optional(),
  product_discount_order_qty: z
    .number()
    .positive({ message: "Orders must be greater than zero." })
    .optional(),
});

const ProductDiscountForm = () => {
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_discount_percent:
        formData?.variants?.product_discount_percent || undefined,
      product_discount_order_qty:
        formData?.variants?.product_discount_order_qty || undefined,
    },
  });

  useEffect(() => {
    form.reset({
      product_discount_percent:
        formData?.variants?.product_discount_percent || undefined,
      product_discount_order_qty:
        formData?.variants?.product_discount_order_qty || undefined,
    });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper title="Product Discount" label="Discount in %">
        <div className="flex gap-2">
          <Form {...form}>
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
                          onChange={(e) => {
                            const value = e.target.value.trim();
                            const numValue = value ? Number(value) : undefined; // Convert to number or undefined

                            if (
                              numValue === undefined ||
                              (numValue >= 1 && numValue <= 100)
                            ) {
                              field.onChange(numValue);
                              updateFormData({
                                variants: {
                                  ...formData.variants, // Preserve other variant data
                                  product_discount_percent: numValue,
                                },
                              });
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>This field is optional</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </Form>
          <Form {...form}>
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
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.trim();
                          const numValue = value ? Number(value) : undefined; // Convert to number or undefined

                          if (numValue === undefined || numValue >= 1) {
                            field.onChange(numValue);
                            updateFormData({
                              variants: {
                                ...formData.variants, // Preserve other variant data
                                product_discount_order_qty: numValue,
                              },
                            });
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>This field is optional</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </Form>
        </div>
      </FormWrapper>
    </>
  );
};

export default ProductDiscountForm;
