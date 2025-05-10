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
    const userId = formData.get("userId");
    const contestId = formData.get("contestId");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const email = formData.get("email");
    const phone = formData.get("phone");

    if (
      !file ||
      !userId ||
      !contestId ||
      !first_name ||
      !last_name ||
      !email ||
      !phone
    ) {
      return customMessage("Missing required fields", {}, 400);
    }

    const allowedTypes = [
      "video/mp4",
      "video/x-mvi",
      "video/x-matroska",
      "video/quicktime",
    ];
    if (!allowedTypes.includes(file.type)) {
      return customMessage("Unsupported video format", {}, 400);
    }

    // ✅ Convert `file` to Base64
    const fileBuffer = await file.arrayBuffer();
    const dataUri = `data:${file.type};base64,${Buffer.from(
      fileBuffer
    ).toString("base64")}`;

    if (!(await prisma.user.findUnique({ where: { id: userId } }))) {
      return customMessage("User does not exist", {}, 400);
    }
    if (!(await prisma.contest.findUnique({ where: { id: contestId } }))) {
      return customMessage("Invalid contest ID", {}, 400);
    }
    const userExist = await prisma.contestSubmission.findFirst({
      where: {
        userId: userId,
        contestId: contestId,
      },
    });

    // ✅ Delete existing contest and Cloudinary file if present
    await Promise.all([
      userExist &&
        prisma.contestSubmission.delete({
          where: { id: userExist.id },
        }),
      userExist?.publicId && removeUploadedImage([userExist.publicId], "video"),
    ]);

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      resource_type: "video",
      folder: "ysfon/contest",
    });

    const { width, height, format, duration, bytes } = uploadResponse;

    // ✅ Analyze video metadata
    const resolution = `${width}x${height}`;
    const fileSize = bytes;
    const videoDuration = duration;

    const maxDuration = 120;
    const minResolution = [1280, 720];

    if (
      videoDuration > maxDuration ||
      width < minResolution[0] ||
      height < minResolution[1]
    ) {
      await removeUploadedImage([uploadResponse.public_id], "video");
      return customMessage(
        "Video does not meet required specifications.",
        {},
        400
      );
    }

    // ✅ Store data in the database (Optional: You can save the video metadata too)
    const data = await prisma.contestSubmission.create({
      data: {
        userId,
        contestId,
        firstName: first_name,
        lastName: last_name,
        email,
        phone,
        videoUrl: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
        resolution,
        fileSize,
        duration: videoDuration,
        format,
        processingStatus: "completed",
      },
    });

    // Send Confirmation Email
    return customMessage(
      "File uploaded and analyzed successfully, check your mailbox for details",
      { data },
      200
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return ServerError(error, {}, 500);
  }
};
