import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/authProvider";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
