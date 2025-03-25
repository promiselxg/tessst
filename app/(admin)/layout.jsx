import { ImageProvider } from "@/context/imageUpload.context";
import SessionProvider from "@/providers/sessionProvider";
import DashboardHeader from "./dashboard/_components/dashboard/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>
          <SessionProvider>
            <ImageProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <DashboardHeader />
                  {children}
                  <Toaster richColors />
                </SidebarInset>
              </SidebarProvider>
            </ImageProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
