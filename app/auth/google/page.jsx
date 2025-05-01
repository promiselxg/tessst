"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import ROLES from "@/lib/utils/roles";
import { useCallbackUrl } from "@/hooks/use-callback-url";

export default function GoogleCallback() {
  const { data: session, status } = useSession();

  const callbackUrl = useCallbackUrl();

  useEffect(() => {
    const handleAuth = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/login/google`,
            {
              email: session.user.email,
              name: session.user.name,
              avatar: session.user.image,
              provider: "google",
            }
          );

          const { user, accessToken, refreshToken } = res.data;

          Cookies.set("accessToken", accessToken, {
            expires: 1 / 24,
            secure: true,
          });
          Cookies.set("refreshToken", refreshToken, {
            expires: 7,
            secure: true,
          });

          useAuthStore.setState({ user, isAuthenticated: true });

          toast.success("Login successful");
          if (user.roles?.includes(ROLES.admin)) {
            window.location = callbackUrl || "/dashboard";
          } else {
            window.location = callbackUrl;
          }
        } catch (err) {
          console.error("Google login failed:", err);
        }
      }
    };

    handleAuth();
  }, [session, status, callbackUrl]);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[rgba(0,0,0,0.2)]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[--app-primary-color] border-t-transparent" />
        <p className="text-sm text-muted-foreground font-medium">
          Loggin in, please wait...
        </p>
      </div>
    </div>
  );
}
