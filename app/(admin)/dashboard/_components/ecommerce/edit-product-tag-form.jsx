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
import { Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiCall } from "@/lib/utils/api";

const formSchema = z.object({
  product_tags: z.array(z.string()).optional(),
});

const EditProductTagForm = ({ product_tag = [], id }) => {
  const initialTags = product_tag.map((tag) => tag.name);
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_tags: initialTags,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit() {
    try {
      const tagsToUpdate = tags.map((tag) => {
        // Check if this was an existing tag (from initial props)
        const existingTag = product_tag.find((t) => t.name === tag);
        return existingTag ? { id: existingTag.id, name: tag } : { name: tag };
      });

      const response = await apiCall("patch", `/product/${id}`, {
        tags: tagsToUpdate,
      });
      toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong while updating tags"
      );
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z,\s]/g, "");

    if (value !== filteredValue) {
      e.target.value = filteredValue;
      setInputValue(filteredValue);
      return;
    }

    // If comma is typed, add tag
    if (value.includes(",")) {
      const newTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(
          (tag) =>
            tag.length > 0 && !tags.includes(tag) && /^[a-zA-Z\s]+$/.test(tag)
        );

      if (newTags.length > 0) {
        const updatedTags = [...tags, ...newTags];
        setTags(updatedTags);
        setInputValue("");
      }
    } else {
      setInputValue(value);
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  useEffect(() => {
    form.setValue("product_tags", tags);
  }, [tags, form]);

  return (
    <>
      <FormWrapper
        title="Product Tags"
        label="Enter product tags separated by commas."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="product_tags"
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
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="focus:outline-none"
                          >
                            <X className="w-3 h-3 ml-1 cursor-pointer" />
                          </button>
                        </Badge>
                      ))}
                      <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter tags, press comma to add"
                        className="flex-1 shadow border-0 focus-visible:ring-0"
                        disabled={isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>This field is optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Please wait...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </FormWrapper>
    </>
  );
};

export default EditProductTagForm;
