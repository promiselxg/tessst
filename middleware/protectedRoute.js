"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/authProvider";

export default function ProtectedRouteWrapper({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login?callbackUrl=/store/checkout");
    } else {
      setCheckingAuth(false);
    }
  }, [user, router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return <>{children}</>;
}
