import { apiCall } from "@/lib/utils/api";
import prisma from "@/lib/utils/dbConnect";
import { apiClient } from "@/lib/utils/host";

export const getAllTrainingCategories = async () => {
  try {
    const { data } = await apiClient("/category");
    return data.categories;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPublishedCourses = async () => {
  return await apiCall("get", `/training/course/published`);
};

export const getAllTrainingProgress = async () => {
  return await apiCall("get", `/training/course/progress/${courseId}`);
};

export const getTrainingProgress = async (courseId) => {
  return await apiCall("get", `/training/course/progress/${courseId}`);
};

export const getChapter = async ({ userId, courseId, chapterId }) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId, isPublished: true },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: { position: "asc" },
        },
      },
    });

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId, isPublished: true },
    });

    if (!course || !chapter) {
      throw new Error("Course or chapter not found");
    }

    let muxData = null;
    let attachments = [];
    let nextChapter = null;

    if (purchase) {
      attachments = await prisma.attachment.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await prisma.muxData.findUnique({
        where: { chapterId },
      });

      nextChapter = await prisma.chapter.findFirst({
        where: {
          courseId,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: { position: "asc" },
      });
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      course,
      chapter,
      purchase,
      muxData,
      attachments,
      nextChapter,
      userProgress,
    };
  } catch (error) {
    console.log("[GET CHAPTER ERROR]", error);
  }
};
