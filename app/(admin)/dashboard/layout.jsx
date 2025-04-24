import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/authProvider";
import { ConfettiProvider } from "@/context/confettiContext";
import { FormProvider } from "@/context/form.context";
import { ImageProvider } from "@/context/imageUpload.context";
import SessionProvider from "@/providers/sessionProvider";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
  return (
    <main>
      <AuthProvider>
        <FormProvider>
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
        </FormProvider>
      </AuthProvider>
    </main>
  );
}
