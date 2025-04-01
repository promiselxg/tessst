import { z } from "zod";

export const productSchema = z.object({
  product_title: z.string().min(1, "Product title is required."),
  product_description: z.string().min(1, "Product description is required."),
  product_price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format."),
  product_category: z.string().min(1, "Product category is required."),
  product_tag: z.array(z.string().min(1, "Tag cannot be empty.")).optional(),
  product_main_image: z
    .array(z.object({}))
    .min(1, "At least one main image is required."),
  product_images: z
    .array(z.object({}))
    .min(1, "At least one product image is required."),
});

// try {
//   productSchema.parse(inputData);  // Validate the input
//   console.log("Validation successful");
// } catch (e) {
//   console.error("Validation error:", e.errors);
// }
