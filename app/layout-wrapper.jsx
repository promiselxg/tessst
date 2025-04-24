"use client";

import { Footer } from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { AuthProvider } from "@/context/authProvider";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const couseDetailPage = pathname.match(/^\/training\/[^/]+$/);
  const showLayout =
    !pathname.startsWith("/auth") && !pathname.startsWith("/dashboard");

  return (
    <AuthProvider>
      {showLayout && !couseDetailPage && <Navbar />}
      {children}
      {showLayout && !couseDetailPage && <Footer />}
    </AuthProvider>
  );
}
