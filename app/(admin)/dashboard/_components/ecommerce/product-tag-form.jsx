"use client";
import React, { useEffect, useState } from "react";
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
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  product_tag: z.array(z.string()).optional(),
});

const ProductTagForm = () => {
  const { formData, updateFormData } = useFormData();
  const [tags, setTags] = useState(formData.product_tag || []);
  const [inputValue, setInputValue] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_tag: formData.product_tag || [],
    },
  });

  const handleInputChange = (e) => {
    const value = e.target.value;

    // If comma is typed, add tag
    if (value.includes(",")) {
      const newTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0); // Avoid empty tags

      const updatedTags = [...tags, ...newTags];
      setTags(updatedTags);
      updateFormData({ product_tag: updatedTags });
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    updateFormData({ product_tag: updatedTags });
  };

  useEffect(() => {
    form.reset({ product_tag: formData.product_tag || "" });
  }, [form, formData, form.reset]);

  console.log(formData);

  return (
    <>
      <FormWrapper
        title="Product Tags"
        label="Enter product tags separated by commas. these tags will help categorize the product."
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="product_tag"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-md p-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="flex items-center gap-1 bg-sky-700 hover:bg-sky-600 text-white px-2 py-1 rounded-md"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(index)}>
                          <X className="w-3 h-3 ml-1 cursor-pointer" />
                        </button>
                      </Badge>
                    ))}
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter tags, press comma to add"
                      className="flex-1 shadow"
                    />
                  </div>
                </FormControl>
                <FormDescription>This field is optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </FormWrapper>
    </>
  );
};

export default ProductTagForm;
