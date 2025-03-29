"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/utils/api";

import {
  Form,
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/authProvider";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
});

const CourseTitle = () => {
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const response = await apiCall("POST", "/training/course/create", {
        title: values.title,
        userId: user?.id,
      });
      if (response) {
        toast.success(`${response.message}`);
        router.replace(`/dashboard/training/course/${response?.course?.id}`);
      }
    } catch (error) {
      toast?.error("Something went wrong!", {
        description: `${error?.response?.data?.message}`,
      });
    }
  };

  useEffect(() => {
    if (!user) {
      router?.push("/auth/login");
    }
  }, [user, router]);

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="eg: 'Advanced web development"
                      className="shadow"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-slate-500 italic">
                    What would you like to name this training? you can change
                    this later
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/dashboard/training">
                <Button
                  type="button"
                  variant="ghost"
                  className=" cursor-pointer"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className=" animate-spin" /> Please wait...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CourseTitle;
