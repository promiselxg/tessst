import { AuthProvider } from "@/context/authProvider";
import { Toaster } from "sonner";

export default function LoginLayout({ children }) {
  return (
    <AuthProvider>
      <Toaster richColors />
      {children}
    </AuthProvider>
  );
}
