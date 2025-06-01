import { z } from "zod";

export const rewardSchema = z.object({
  position: z.string().min(1, "Position is required"),
  feature: z.string().min(1, "Feature is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a number",
    }),
});

export const criteriaSchema = z.object({
  heading: z
    .string()
    .min(1, "Heading is required")
    .max(50, "Heading cannot exceed 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description cannot exceed 100 characters"),
});

export const contestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  rules: z.string().min(1, "Rules are required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  enableRewards: z.boolean(),
  rewards: z.array(rewardSchema).optional().default([]),
  criteria: z.array(criteriaSchema).optional().default([]),
  images: z.array(z.any()).optional().default([]),
});
