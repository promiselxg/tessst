"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useEffect, useState } from "react";
import DonateBtn from "./dontate-btn";
import {
  acceptNumbersOnly,
  validatePhoneNumber,
} from "@/lib/utils/regExpression";
import { Checkbox } from "@/components/ui/checkbox";
import { toKobo } from "@/lib/paystack/toKobo";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "sonner";

const formSchema = z.object({
  first_name: z
    .string()
    .min(5, { message: "First name must be at least 5 characters long" })
    .refine((val) => val.trim() !== "", {
      message: "First name cannot be empty",
    })
    .optional(),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .refine((val) => val.trim() !== "", {
      message: "Last name cannot be empty",
    })
    .optional(),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters" })
    .refine((val) => val.trim() !== "", {
      message: "Phone number cannot be empty",
    })
    .optional(),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  annonymous: z.boolean().default(false).optional(),
  amount: z.string().min(4, { message: "Amount must be at least 1000" }),
});

const DonateUserInfo = ({ productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  const predefinedAmounts = [1000, 5000, 10000, 20000];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: undefined,
      last_name: undefined,
      phone: undefined,
      email: "",
      amount: "",
      annonymous: false,
    },
  });

  const { watch, handleSubmit, control, setError, clearErrors, setValue } =
    form;
  const annonymous = watch("annonymous");

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/paystack/donate", {
        email: values.email,
        amount: toKobo(values.amount),
        callback_url: `${process.env.NEXT_PUBLIC_HOST_URL}/${pathname}`,
        metadata: {
          first_name: values.first_name || "",
          last_name: values.last_name || "",
          phone: values.phone || "",
          orderId: productId,
          isAnonymous: annonymous,
          transactionType: "donate",
        },
      });
      router.replace(`${response?.data?.data?.authorization_url}`);
    } catch (error) {
      toast.error("Payment error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const verifyTransaction = async () => {
      if (trxref && reference) {
        const response = await axios.post(`/api/verify-payment`, {
          reference,
        });
        if (response.data.success) {
          Swal.fire({
            title: "Thank You!",
            text: "Your donation was successful. We appreciate your support!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Close",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              router.replace(`${process.env.NEXT_PUBLIC_HOST_URL}/${pathname}`);
            }
          });
        }
      }
    };
    verifyTransaction();
  }, [trxref, reference, pathname, router]);

  return (
    <div className="relative mb-2">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {!annonymous && (
            <>
              <div className="flex gap-3">
                <FormField
                  control={control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone number"
                        {...field}
                        value={field.value || ""}
                        onKeyUp={(e) => {
                          const valid = validatePhoneNumber(e.target.value);
                          valid
                            ? clearErrors("phone")
                            : setError("phone", {
                                type: "manual",
                                message:
                                  "Phone number must be exactly 11 digits",
                              });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex gap-2 flex-wrap">
            {predefinedAmounts.map((amt) => (
              <button
                type="button"
                key={amt}
                className={`px-4 py-2 rounded-md border text-sm ${
                  watch("amount") === amt.toString()
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setValue("amount", amt.toString())}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <FormField
            control={control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Amount"
                    {...field}
                    value={field.value || ""}
                    onKeyUp={(e) => acceptNumbersOnly(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  We’ll send your receipt to this email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="annonymous"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Donate anonymously</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <DonateBtn loading={isLoading} />
        </form>
      </Form>
    </div>
  );
};

export default DonateUserInfo;
