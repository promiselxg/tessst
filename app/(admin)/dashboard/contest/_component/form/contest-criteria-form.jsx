"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";
import { Trash2, PlusIcon } from "lucide-react";
import { useFormData } from "@/context/form.context";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";

// Schema
const criteriaItemSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
});

const criteriaSchema = z.object({
  criteria: z.array(criteriaItemSchema).min(1),
});

const ContestCriteriaForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(criteriaSchema),
    defaultValues: {
      criteria: formData.criteria?.length
        ? formData.criteria.map((c) => ({
            heading: c.heading || "",
            description: c.description || "",
          }))
        : [{ heading: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "criteria",
  });

  const syncToContext = debounce((criteria) => {
    updateFormData({ criteria });
  }, 300);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value?.criteria) {
        syncToContext(value.criteria);
      }
    });

    return () => {
      subscription.unsubscribe();
      syncToContext.cancel();
    };
  }, [form.watch, form, syncToContext]);

  return (
    <Form {...form}>
      <FormWrapper
        title="Judging Criteria"
        label="Define how entries will be evaluated."
      >
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col  gap-4 items-start">
              <div className="col-span-12">
                <label className="text-sm font-semibold">
                  Criteria {index + 1}
                </label>
              </div>

              <FormField
                control={form.control}
                name={`criteria.${index}.heading`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Heading" maxLength={50} {...field} />
                    </FormControl>
                    <div
                      className={cn(
                        "text-xs text-right",
                        field.value.length > 40
                          ? "text-orange-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {field.value.length}/50
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`criteria.${index}.description`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className=" resize-none"
                        rows={3}
                        {...field}
                        maxLength={100}
                      />
                    </FormControl>
                    <div
                      className={cn(
                        "text-xs text-right",
                        field.value.length > 80
                          ? "text-orange-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {field.value.length}/100
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <div className="col-span-1 flex justify-end mt-6">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}

          <Button
            type="button"
            onClick={() => append({ heading: "", description: "" })}
            className="flex items-center gap-2 w-fit bg-transparent text-sky-600 hover:bg-transparent shadow-none"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add another criteria</span>
          </Button>

          {formErrors
            .filter((e) => e.path === "criteria")
            .map((err, i) => (
              <p key={i} className="text-sm text-red-500">
                {err.message}
              </p>
            ))}
        </div>
      </FormWrapper>
    </Form>
  );
};

export default ContestCriteriaForm;
