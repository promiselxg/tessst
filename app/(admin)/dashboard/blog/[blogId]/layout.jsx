import { FormProvider } from "@/context/form.context";

export default function EditBlogFormLayout({ children }) {
  return (
    <main>
      <FormProvider>{children}</FormProvider>
    </main>
  );
}
