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
import { useFormData } from "@/context/form.context";

const formSchema = z.object({
  product_stock_qty: z
    .number()
    .positive({ message: "Stock must be greater than zero." }),
});

const ProductStockForm = () => {
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_stock_qty: formData.product_stock_qty || "",
    },
  });

  useEffect(() => {
    form.reset({ product_stock_qty: formData.product_stock_qty || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper
        title="Product quantity"
        label="How many of this product is in stock?"
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="product_stock_qty"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Product quantity"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateFormData({ product_stock_qty: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </Form>
      </FormWrapper>
    </>
  );
};

export default ProductStockForm;
