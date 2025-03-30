import { ImageProvider } from "@/context/imageUpload.context";
import SessionProvider from "@/providers/sessionProvider";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/authProvider";
import { CourseProvider } from "@/context/courseContext";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>
          <AuthProvider>
            <CourseProvider>
              <SessionProvider>
                <ImageProvider>
                  <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                      {children}
                      <Toaster richColors />
                    </SidebarInset>
                  </SidebarProvider>
                </ImageProvider>
              </SessionProvider>
            </CourseProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
