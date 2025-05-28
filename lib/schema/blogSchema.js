import { z } from "zod";

export const validateVariants = (variants) => {
  return Object.entries(variants).every(
    ([key, value]) => key && value.trim() !== ""
  );
};

export const blogSchema = z.object({
  blog_title: z.string().min(10, {
    message: "Blog title must be at least 10 characters.",
  }),
  content: z.string().min(100, {
    message: "description must be at least 100 characters long.",
  }),
  categoryId: z.string().min(1, {
    message: "category is required",
  }),
  images: z.array(z.instanceof(File)).min(1, {
    message: "At least one image is required",
  }),
});

export function extractValidationErrors(errors) {
  const errorMessages = errors.map((error) => ({
    message: error.message,
    path: error.path.join(" -> "),
  }));

  return errorMessages;
}
