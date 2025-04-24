"use client";

import { Footer } from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const showLayout =
    !pathname.startsWith("/auth") && !pathname.startsWith("/dashboard");

  return (
    <>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
