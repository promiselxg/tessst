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
  FormMessage,
} from "@/components/ui/form";
import { useFormData } from "@/context/form.context";
import FormWrapper from "../../../_components/ecommerce/form-wrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  startDate: z.date({
    required_error: "A date of birth is required.",
  }),
});

const ContestEndDateForm = () => {
  const { formData, updateFormData, formErrors } = useFormData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endDate: formData.endDate || "",
    },
  });

  useEffect(() => {
    form.reset({ endDate: formData.endDate || "" });
  }, [form, formData, form.reset]);

  return (
    <>
      <FormWrapper title="End Date" label="When is this competition ending?">
        <Form {...form}>
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full md:w-[240px]  font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        updateFormData({ endDate: date });
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date < new Date("1900-01-01");
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage>
                  {formErrors
                    .filter((error) => error.path === "endDate")
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

export default ContestEndDateForm;
