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
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_manufacturer: formData?.variant?.product_manufacturer || "",
    },
  });

  useEffect(() => {
    form.reset({
      product_manufacturer: formData?.variant?.product_manufacturer || "",
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
                        const value = e.target.value;
                        field.onChange(value);
                        updateFormData({
                          variant: {
                            ...formData.variant,
                            product_manufacturer: value,
                          },
                        });
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

export default ProductManufacturerForm;
