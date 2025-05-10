import { removeUploadedImage } from "@/lib/utils/cloudinary";
import { customMessage, ServerError } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";

import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const chapterId = formData.get("chapterId");

    if (!file || !chapterId) {
      return customMessage("File or Chapter ID missing", {}, 400);
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Helper: Convert buffer to readable stream
    const bufferToStream = (buffer) => {
      return new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });
    };

    // Upload via stream
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "ysfon/video" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      bufferToStream(fileBuffer).pipe(stream);
    });

    const uploadResponse = await uploadPromise;

    const existingMuxData = await prisma.muxData.findUnique({
      where: { chapterId },
    });

    await Promise.all([
      existingMuxData && prisma.muxData.delete({ where: { chapterId } }),
      existingMuxData?.publicId &&
        removeUploadedImage([existingMuxData.publicId], "video"),
    ]);

    const [mux] = await Promise.all([
      prisma.muxData.create({
        data: {
          assetId: uploadResponse.asset_id,
          publicId: uploadResponse.public_id,
          chapter: { connect: { id: chapterId } },
        },
      }),
      prisma.chapter.update({
        where: { id: chapterId },
        data: {
          videoUrl: uploadResponse.secure_url,
          mediaType: "VIDEO",
        },
      }),
    ]);

    return customMessage("File uploaded successfully", { mux }, 200);
  } catch (error) {
    console.error("Error uploading file:", error);
    return ServerError(error, {}, 500);
  }
};
