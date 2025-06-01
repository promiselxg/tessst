import { FormProvider } from "@/context/form.context";

export default function EditProjectLayoutPage({ children }) {
  return (
    <main>
      <FormProvider>{children}</FormProvider>
    </main>
  );
}
