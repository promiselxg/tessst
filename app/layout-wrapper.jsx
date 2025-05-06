"use client";

import { Footer } from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { AuthProvider } from "@/context/authProvider";
import { ConfettiProvider } from "@/context/confettiContext";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isCourseOrChapterPage = pathname.match(
    /^\/training\/[^/]+(\/chapters\/[^/]+)?$/
  );
  const showLayout =
    !pathname.startsWith("/auth") && !pathname.startsWith("/dashboard");

  const orderSuccess = pathname.startsWith("/store/checkout/success");

  return (
    <AuthProvider>
      <SessionProvider>
        {showLayout && !isCourseOrChapterPage && !orderSuccess && <Navbar />}
        {children}
        {showLayout && !isCourseOrChapterPage && !orderSuccess && <Footer />}
        <ConfettiProvider />
      </SessionProvider>
    </AuthProvider>
  );
}
