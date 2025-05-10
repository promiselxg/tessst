"use client";
import { Input } from "@/components/ui/input";
import { useFormContext } from "@/context/contest.form.conext";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/authProvider";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name is required")
    .max(50, "First name is too long"),
  last_name: z
    .string()
    .min(2, "Last name is required")
    .max(50, "Last name is too long"),

  phone: z
    .string()
    .min(2, "Phone number is required")
    .max(50, "Phone number is too long")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),

  email: z
    .string()
    .min(2, "Email is required")
    .max(50, "Email is too long")
    .email("Invalid email format"),
});

const PersonalInfo = () => {
  const { formData, handleChange } = useFormContext();
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
    },
  });

  function onSubmit(values) {}

  return (
    <>
      <h1 className="font-[600]">Personal Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="w-full flex justify-between gap-5 flex-col md:flex-row">
            <FormField
              control={form.control}
              name="first_name"
              id="first_name"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormDescription>Enter your First name.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              id="last_name"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormDescription>Enter your Last name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex">
            <FormField
              control={form.control}
              name="phone"
              id="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      {...field}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormDescription>Enter your Phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex">
            <FormField
              control={form.control}
              name="email"
              id="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email number"
                      {...field}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormDescription>
                    you will be contacted through this email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default PersonalInfo;
