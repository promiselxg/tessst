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
  product_manufacturer: z.string().min(10, {
    message: "Product title must be at least 10 characters.",
  }),
});

const ProductManufacturerForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_manufacturer: formData?.product_manufacturer || "",
    },
  });

  useEffect(() => {
    form.reset({
      product_manufacturer: formData?.product_manufacturer || "",
    });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper title="Product manufacturer" label="this field is optional">
        <Form {...form}>
          <FormField
            control={form.control}
            name="product_manufacturer"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="product manufacturer"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateFormData({
                          product_manufacturer: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {formErrors
                      .filter((error) => error.path === "product_manufacturer")
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

export default ProductManufacturerForm;
