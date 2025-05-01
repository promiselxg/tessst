"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/context/authProvider";
import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { useCallbackUrl } from "@/hooks/use-callback-url";
import { Separator } from "@radix-ui/react-select";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username is required",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const { loginUser } = useAuthStore();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const callbackUrl = useCallbackUrl();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values.username, values.password);
      if (response.success === true) {
        toast.success("Login successful");
        window.location = callbackUrl;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/auth/google",
      });
    } catch (err) {
      console.error("Google login error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    if (user) {
      router.replace(callbackUrl || "/");
    }
  }, [callbackUrl, user, router]);

  if (!isMounted) return null;

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden w-full md:w-1/2 mx-auto">
        <CardContent className="grid p-0 md:grid-cols-1">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 mt-3"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            {...field}
                            placeholder="Enter your username"
                            autoComplete="username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting || loading}
                    className="w-full gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <div className="flex gap-5 items-center text-sm text-gray-700">
                    <Separator
                      orientation="vertical"
                      className="h-[1px]  bg-[#eee] w-full"
                    />
                    or
                    <Separator
                      orientation="vertical"
                      className="h-[1px]  bg-[#eee] w-full"
                    />
                  </div>
                  <Button
                    className="w-full gap-2 bg-[#34A853] hover:bg-[#34A853] hover:text-slate-700 transition-all"
                    onClick={handleGoogleLogin}
                    disabled={loading || isSubmitting}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      <>
                        <FaGoogle className="h-5 w-5" />
                        Continue with Google
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
