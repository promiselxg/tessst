import { z } from "zod";

const muxRegex = /^https:\/\/stream\.mux\.com\/[a-zA-Z0-9]+(?:\.m3u8)?$/;
const youtubeRegex =
  /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/;
const cloudinaryRegex =
  /^https:\/\/res\.cloudinary\.com\/[\w-]+\/video\/upload\/.+$/;

export const projectSchema = z
  .object({
    title: z.string().min(10, {
      message: "Project title must be at least 10 characters.",
    }),
    description: z.string().min(100, {
      message: "Description must be at least 100 characters long.",
    }),
    categoryId: z.string().min(1, {
      message: "Category is required.",
    }),
    mediaType: z.enum(["image", "video"], {
      required_error: "Media type is required.",
    }),
    images: z.array(z.instanceof(File)).optional(),
    videoUrl: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.mediaType === "image" &&
      (!data.images || data.images.length === 0)
    ) {
      ctx.addIssue({
        path: ["images"],
        code: z.ZodIssueCode.custom,
        message: "At least one image is required",
      });
    }

    if (data.mediaType === "video") {
      if (!data.videoUrl || data.videoUrl.trim() === "") {
        ctx.addIssue({
          path: ["videoUrl"],
          code: z.ZodIssueCode.custom,
          message: "Video URL is required",
        });
      } else if (
        !muxRegex.test(data.videoUrl) &&
        !youtubeRegex.test(data.videoUrl) &&
        !cloudinaryRegex.test(data.videoUrl)
      ) {
        ctx.addIssue({
          path: ["videoUrl"],
          code: z.ZodIssueCode.custom,
          message:
            "Video URL must be a valid Mux, YouTube, or Cloudinary link.",
        });
      }
    }
  });
