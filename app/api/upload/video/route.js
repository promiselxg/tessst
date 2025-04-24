import { removeUploadedImage } from "@/lib/utils/cloudinary";
import { customMessage, ServerError } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (req) => {
  try {
    // ✅ Parse form data
    const formData = await req.formData();
    const file = formData.get("file");
    const chapterId = formData.get("chapterId");

    if (!file || !chapterId) {
      return customMessage("File or Chapter ID missing", {}, 400);
    }

    // ✅ Convert `file` to Base64
    const fileBuffer = await file.arrayBuffer();
    const dataUri = `data:${file.type};base64,${Buffer.from(
      fileBuffer
    ).toString("base64")}`;

    // ✅ Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      resource_type: "video",
      folder: "ysfon/video",
    });

    // ✅ Get existing MuxData
    const existingMuxData = await prisma.muxData.findUnique({
      where: { chapterId },
    });

    // ✅ Delete existing MuxData and Cloudinary file if present
    await Promise.all([
      existingMuxData && prisma.muxData.delete({ where: { chapterId } }),
      existingMuxData?.publicId &&
        removeUploadedImage([existingMuxData.publicId], "video"),
    ]);

    // ✅ Create new MuxData entry & update Chapter
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
