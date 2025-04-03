import { FormProvider } from "@/context/form.context";

export default function EcommerceFormLayout({ children }) {
  return (
    <main>
      <FormProvider>{children}</FormProvider>
    </main>
  );
}
