"use client";

import { Footer } from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { AuthProvider } from "@/context/authProvider";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isCourseOrChapterPage = pathname.match(
    /^\/training\/[^/]+(\/chapters\/[^/]+)?$/
  );
  const showLayout =
    !pathname.startsWith("/auth") && !pathname.startsWith("/dashboard");

  return (
    <AuthProvider>
      {showLayout && !isCourseOrChapterPage && <Navbar />}
      {children}
      {showLayout && !isCourseOrChapterPage && <Footer />}
    </AuthProvider>
  );
}
