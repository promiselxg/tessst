import { ImageProvider } from "@/context/imageUpload.context";
import SessionProvider from "@/providers/sessionProvider";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/authProvider";
import { ConfettiProvider } from "@/context/confettiContext";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>
          <AuthProvider>
            <SessionProvider>
              <ImageProvider>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                    {children}
                    <ConfettiProvider />
                    <Toaster richColors />
                  </SidebarInset>
                </SidebarProvider>
              </ImageProvider>
            </SessionProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
