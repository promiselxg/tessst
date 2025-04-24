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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormData } from "@/context/form.context";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  product_discount_percent: z.number().optional(),
  product_discount_order_qty: z.number().optional(),
});

const ProductDiscountForm = () => {
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_discount_percent: formData?.product_discount_percent || "",
      product_discount_order_qty: formData?.product_discount_order_qty || "",
    },
  });

  useEffect(() => {
    form.reset({
      product_discount_percent: formData?.product_discount_percent || "",
      product_discount_order_qty: formData?.product_discount_order_qty || "",
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
                            updateFormData({
                              product_discount_percent: sanitizedValue,
                            });
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>This field is optional</FormDescription>
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
                          updateFormData({
                            product_discount_order_qty: sanitizedValue,
                          });
                        }}
                      />
                    </FormControl>
                    <FormDescription>This field is optional</FormDescription>
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
