import { AuthProvider } from "@/context/authProvider";
import { Toaster } from "sonner";

export default function AuthLayout({ children }) {
  return (
    <AuthProvider>
      <main className="min-h-screen flex items-center justify-center">
        {children}
      </main>
      <Toaster richColors />
    </AuthProvider>
  );
}
