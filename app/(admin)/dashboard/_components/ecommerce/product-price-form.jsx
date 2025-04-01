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
import { Input } from "@/components/ui/input";
import { useFormData } from "@/context/form.context";

const formSchema = z.object({
  product_price: z
    .number()
    .positive({ message: "Price must be greater than zero." })
    .multipleOf(0.01, { message: "Price must be a valid amount." }),
});

const ProductPriceForm = () => {
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_price: formData.product_price || "",
    },
  });

  useEffect(() => {
    form.reset({ product_price: formData.product_price || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper
        title="Product price"
        label="Enter the price of the product."
      >
        <Form {...form}>
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
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateFormData({ product_price: e.target.value });
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

export default ProductPriceForm;
