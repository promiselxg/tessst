"use client";
import React, { useEffect, useState } from "react";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFormData } from "@/context/form.context";

import { capitalizeFirstLetter } from "@/lib/utils/regExpression";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";
import { getAllBlogCategories } from "@/service/blog/blogService";

const formSchema = z.object({
  categoryId: z.string(),
});

const BlogCategoryForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: formData.categoryId || "",
    },
  });

  useEffect(() => {
    form.reset({ categoryId: formData.categoryId || "" });
  }, [form, formData, form.reset]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData({ categoryId: value.categoryId });
    });

    return () => subscription.unsubscribe();
  }, [form, form.watch, updateFormData]);

  const fetchBlogCategories = async () => {
    try {
      const response = await getAllBlogCategories();
      setBlogCategories(response.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogCategories();
  }, []);
  return (
    <>
      <FormWrapper title="Category" label="Select  category">
        <Form {...form}>
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {blogCategories?.map((category) => (
                      <SelectItem value={category?.id} key={category?.id}>
                        {capitalizeFirstLetter(category?.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>
                  {formErrors
                    .filter((error) => error.path === "categoryId")
                    .map((error, index) => (
                      <span key={index}>{error.message}</span>
                    ))}
                </FormMessage>
              </FormItem>
            )}
          />
        </Form>
      </FormWrapper>
    </>
  );
};

export default BlogCategoryForm;
