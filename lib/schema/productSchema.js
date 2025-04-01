import { z } from "zod";

export const validateVariants = (variants) => {
  return Object.entries(variants).every(
    ([key, value]) => key && value.trim() !== ""
  );
};

export const productSchema = z.object({
  product_title: z.string().min(10, {
    message: "Product title must be at least 10 characters.",
  }),
  product_description: z.string().min(100, {
    message: "Product description must be at least 100 characters long.",
  }),
  product_price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format.")
    .transform((val) => parseFloat(val)),
  product_stock_qty: z
    .string()
    .regex(/^\d+$/, "Stock quantity must be a number.")
    .transform((val) => parseInt(val, 10)),
  product_category: z.string().min(1, {
    message: "Product category is required",
  }),
  product_tag: z.array(z.string()).optional(),
  product_main_image: z.array(z.instanceof(File)).min(1, {
    message: "At least one product main image is required",
  }),
  product_images: z.array(z.instanceof(File)).min(1, {
    message: "At least one product image is required",
  }),
  product_manufacturer: z.string().optional(),
  product_discount_percent: z.string().optional(),
  product_discount_order_qty: z.string().optional(),
  variants: z
    .object({
      product_variant_size: z.string().optional(),
      product_variant_color: z.string().optional(),
    })
    .optional(),
  product_brief_description: z
    .string()
    .max(100, { message: "A maximum of 100 characters" })
    .min(20, {
      message: "A minimum of 20 characters",
    }),
});

export function extractValidationErrors(errors) {
  const errorMessages = errors.map((error) => ({
    message: error.message,
    path: error.path.join(" -> "),
  }));

  return errorMessages;
}
