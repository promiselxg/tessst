"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { useFormData } from "@/context/form.context";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";

const formSchema = z.object({
  enableRewards: z.boolean().default(false),
});

const ContestRewardCheckBox = () => {
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableRewards: formData.enableRewards || false,
    },
  });

  useEffect(() => {
    form.reset({
      enableRewards: formData.enableRewards || false,
    });
  }, [formData, form.reset, form]);

  return (
    <FormWrapper title="Rewards" label="Enable contest rewards">
      <Form {...form}>
        <FormField
          control={form.control}
          name="enableRewards"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(!!checked);
                    updateFormData({ enableRewards: !!checked });
                  }}
                />
              </FormControl>
              <FormLabel className="text-sm font-medium cursor-pointer ">
                Enable contest rewards
              </FormLabel>
            </FormItem>
          )}
        />
      </Form>
    </FormWrapper>
  );
};

export default ContestRewardCheckBox;
