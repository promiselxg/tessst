"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

// Schema
const rewardItemSchema = z.object({
  feature: z.string().min(1, "Feature is required"),
  amount: z.string().min(1, "Amount is required"),
});

const rewardSchema = z.object({
  rewards: z.array(rewardItemSchema).min(1),
});

const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

const ContestRewardForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      rewards: formData.rewards?.length
        ? formData.rewards.map((r, i) => ({
            feature: r.feature || "",
            amount: r.amount || "",
          }))
        : [{ feature: "", amount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rewards",
  });

  // Debounced sync function
  const syncToContext = debounce((rewards) => {
    const synced = rewards.map((r, i) => ({
      ...r,
      position: getOrdinal(i + 1),
    }));
    updateFormData({ rewards: synced });
  }, 300); // 300ms delay

  // Real-time sync with debounce
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value?.rewards) {
        syncToContext(value.rewards);
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
        title="Reward Tiers"
        label="Add rewards for each position in the competition."
      >
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-3">
                <label className="text-sm font-medium">Position</label>
                <div className="border px-3 py-2 rounded bg-muted text-muted-foreground text-sm">
                  {getOrdinal(index + 1)}
                </div>
              </div>

              <FormField
                control={form.control}
                name={`rewards.${index}.feature`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormControl>
                      <Input placeholder="Feature" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`rewards.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormControl>
                      <Input placeholder="Amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <div className="col-span-1 flex justify-end">
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
            onClick={() => append({ feature: "", amount: "" })}
            className="flex items-center gap-2 w-fit bg-transparent text-sky-600 hover:bg-transparent shadow-none"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add another reward</span>
          </Button>

          {formErrors
            .filter((e) => e.path === "rewards")
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

export default ContestRewardForm;
