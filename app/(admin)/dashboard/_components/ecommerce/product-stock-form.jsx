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
  const { formData, updateFormData, formErrors } = useFormData();

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
                      id="product_stock_qty"
                      maxLength={3}
                      onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        field.onChange(sanitizedValue);
                        updateFormData({ product_stock_qty: sanitizedValue });
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {formErrors
                      .filter((error) => error.path === "product_stock_qty")
                      .map((error, index) => (
                        <span key={index}>{error.message}</span>
                      ))}
                  </FormMessage>
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
