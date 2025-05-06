"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { apiCall } from "@/lib/utils/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCheckoutStore } from "@/store/useCheckoutStore";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Invalid phone number"),
  additional_phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10,15}$/.test(val), {
      message: "Invalid phone number",
    }),
  delivery_address: z.string().min(5, "Delivery address is required"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  isDefault: z.boolean().default(false).optional(),
});

const AddCustomerAddress = () => {
  const [regions, setRegions] = useState([]);
  const { addCustomerAddress } = useCheckoutStore();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      additional_phone: "",
      delivery_address: "",
      region: "",
      city: "",
      isDefault: false,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      const response = await apiCall("post", "/customer", {
        customerInfo: { ...values, state: values.region },
      });
      addCustomerAddress(response.data);
      toast.success(response?.message);
      router.replace("/store/checkout/addresses");
    } catch (error) {
      toast.error(error?.message || "something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchRegions = async () => {
      const res = await fetch("/regions.json");
      const data = await res.json();
      setRegions(data.states);
    };
    fetchRegions();
  }, []);

  const selectedRegionData = regions.find((r) => r.value === selectedRegion);

  return (
    <div className="p-5 text-sm text-slate-700 space-y-2 flex  w-full flex-col bg-white shadow-sm rounded-[8px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex items-center justify-between gap-5 md:flex-row flex-col">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between gap-5 md:flex-row flex-col">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional_phone"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Additional Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Additional Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between gap-5">
            <FormField
              control={form.control}
              name="delivery_address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Delivery Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex md:items-center justify-between gap-5 md:flex-row flex-col">
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Region</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      setSelectedRegion(val);
                      form.setValue("city", "");
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>City</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedRegion}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(selectedRegionData?.cities || []).map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-5">
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 my-4 cursor-pointer">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel className=" cursor-pointer">
                      Set as Default Address
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full justify-end gap-6 items-center flex">
            {isSubmitting || isLoading ? (
              <span className="text-gray-400 cursor-not-allowed">Cancel</span>
            ) : (
              <Link
                href="/store/checkout"
                className="text-blue-500 hover:underline"
              >
                Cancel
              </Link>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  saving...
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCustomerAddress;
