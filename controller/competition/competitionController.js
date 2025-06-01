import { removeUploadedImage } from "@/lib/utils/cloudinary";
import { customMessage, ServerError } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";
import { dateDiffInDays } from "@/lib/utils/getDateDifference";
import sanitize from "sanitize-html";
import { isValidUUID } from "@/lib/utils/validateUUID";

const createNewCompetition = async (req) => {
  try {
    const { formData } = await req.json();

    const {
      image,
      title,
      startDate,
      endDate,
      description,
      rewards,
      rules,
      criteria,
    } = formData;

    const cleanupImages = async (img) => {
      await removeUploadedImage(img);
    };

    if (!image || !title || !startDate || !endDate || !description || !rules) {
      await cleanupImages(image);
      return customMessage("Missing required fields", {}, 400);
    }

    if (!Array.isArray(image) || image.length === 0) {
      return customMessage("image must be a non-empty array.", {}, 400);
    }

    const formattedMedia = image.map((item) => {
      if (!item.public_id || !item.public_url) {
        throw new Error("Image must include public_id and public_url.");
      }
      return {
        publicId: item.public_id,
        public_url: item.public_url,
      };
    });

    if (rewards) {
      if (!Array.isArray(rewards)) {
        cleanupImages(image);
        return customMessage("Rewards must be an array of objects", {}, 400);
      }

      const isValid = rewards.every((reward) => {
        if (!reward.position || !reward.feature) return false;

        if (typeof reward.feature === "string") {
          reward.feature = reward.feature
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean);
        }

        return Array.isArray(reward.feature);
      });

      if (!isValid) {
        cleanupImages(image);
        return customMessage(
          "Each reward must have 'position' and 'features'",
          {},
          400
        );
      }
    }

    if (criteria) {
      if (!Array.isArray(criteria)) {
        cleanupImages(image);
        return customMessage("criteria must be an array of objects", {}, 400);
      }

      const isValid = criteria.every((c) => {
        if (!c.heading || !c.description) return false;
        if (typeof c.description === "string") {
          c.description = c.description
            .split(",")
            .map((d) => d.trim())
            .filter(Boolean);
        }

        return Array.isArray(c.description);
      });
      if (!isValid) {
        cleanupImages(image);
        return customMessage(
          "Each Criteria must have 'heading' and 'description'",
          {},
          400
        );
      }
    }

    const isValidDate = dateDiffInDays(startDate, endDate);
    if (isValidDate === "wrong_date") {
      await cleanupImages(image);
      return customMessage(
        "Invalid Date : Start Date cannot be greater than End Date",
        {},
        400
      );
    }

    const contestExist = await prisma.contest.findFirst({
      where: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    if (contestExist) {
      await cleanupImages(image);
      return customMessage(
        `There is an active contest with this title : ${title}`,
        {},
        400
      );
    }

    const contest = await prisma.contest.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        image: formattedMedia,
        criteria: criteria || null,
        rewards: rewards || null,
        rules: rules,
      },
    });

    return customMessage("contest created successfully", { contest }, 201);
  } catch (error) {
    console.log("COMPETITON_ERROR", error);
    return ServerError(error, {}, 500);
  }
};

const getAllCompetitions = async (req) => {
  const query = req.nextUrl.searchParams;

  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const offset = (page - 1) * limit;

  const search = query.get("search")?.trim().toLowerCase();
  const startDate = query.get("startDate");
  const endDate = query.get("endDate");
  const status = query.get("status");

  const today = new Date();

  try {
    const filters = {};

    // Search filter
    if (search) {
      filters.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // Start and End Date filter
    if (startDate && endDate) {
      filters.AND = [
        { startDate: { gte: new Date(startDate) } },
        { endDate: { lte: new Date(endDate) } },
      ];
    }

    if (status === "active") {
      filters.endDate = { gt: today };
    }

    if (status === "expired") {
      filters.endDate = { lt: today };
    }
    if (status === "upcoming") {
      filters.startDate = { gt: today };
    }

    const [contests, totalCount] = await Promise.all([
      prisma.contest.findMany({
        where: filters,
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { submissions: true },
          },
        },
      }),
      prisma.contest.count({ where: filters }),
    ]);

    return customMessage(
      "Contests retrieved successfully",
      {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        contests,
      },
      200
    );
  } catch (error) {
    console.error("GET_COMPETITIONS_ERROR:", error);
    return ServerError(error, {}, 500);
  }
};

const deleteSingleContest = async (_, params) => {
  try {
    const { id } = await params;
    if (!id) {
      return customMessage("contest ID is required", {}, 400);
    }

    if (!isValidUUID(id)) {
      return customMessage("Invalid contest ID", {}, 400);
    }

    const contest = await prisma.contest.findUnique({
      where: { id },
    });

    if (!contest) {
      return customMessage("contest not found", {}, 404);
    }

    await removeUploadedImage(contest.image);

    await prisma.contest.delete({
      where: { id },
    });

    return customMessage("contest deleted successfully", {}, 200);
  } catch (error) {
    console.log(error);
    return ServerError(error, {}, 500);
  }
};

const deleteMultipleContest = async (req) => {
  try {
    const idsObj = await req.json();

    if (!idsObj || typeof idsObj !== "object") {
      return customMessage("No contest IDs provided", {}, 400);
    }

    const ids = Object.values(idsObj);

    const contests = await prisma.contest.findMany({
      where: { id: { in: ids } },
    });

    const invalidIds = ids.filter((id) => !isValidUUID(id));
    if (invalidIds.length > 0) {
      return customMessage("One or more invalid contest IDs", {}, 400);
    }

    if (contests.length === 0) {
      return customMessage("No contest found for the provided IDs", {}, 404);
    }

    for (const contest of contests) {
      if (!contest) {
        return customMessage("Product not found", {}, 404);
      }
      await removeUploadedImage(contest.image);
    }

    await prisma.contest.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return customMessage("contest deleted successfully", {}, 200);
  } catch (error) {
    console.log(error);
    return ServerError(error, {}, 500);
  }
};

const updateSingleContest = async (req, params) => {
  try {
    const { id } = await params;
    const updates = await req.json();

    if (!id) return customMessage("Contest ID is required", {}, 400);
    if (!isValidUUID(id)) return customMessage("Invalid contest ID", {}, 400);

    const existingContest = await prisma.contest.findUnique({ where: { id } });
    if (!existingContest) return customMessage("Contest not found", {}, 404);

    if (!updates || Object.keys(updates).length === 0) {
      return customMessage("No update fields provided", {}, 400);
    }

    // Sanitize text fields
    if (updates.title) updates.title = sanitize(updates.title);
    if (updates.description)
      updates.description = sanitize(updates.description);
    if (updates.rules) updates.rules = sanitize(updates.rules);

    // Validate and format dates
    if (updates.startDate && isNaN(Date.parse(updates.startDate))) {
      return customMessage("Invalid startDate", {}, 400);
    }
    if (updates.endDate && isNaN(Date.parse(updates.endDate))) {
      return customMessage("Invalid endDate", {}, 400);
    }

    // Validate and format images
    if (updates.image) {
      if (!Array.isArray(updates.image)) {
        return customMessage("Image must be an array of objects", {}, 400);
      }

      const validImages = updates.image.every(
        (img) => img.public_id && img.public_url
      );

      if (!validImages) {
        return customMessage(
          "Each image must have public_id and public_url",
          {},
          400
        );
      }

      updates.image = updates.image.map(({ public_id, public_url }) => ({
        public_id,
        public_url,
      }));

      if (updates.oldImage) {
        await removeUploadedImage(updates.oldImage);
        delete updates.oldImage;
      }
    }

    // Validate rewards
    if (updates.rewards) {
      if (!Array.isArray(updates.rewards)) {
        return customMessage("Rewards must be an array", {}, 400);
      }

      const validRewards = updates.rewards.every((reward) => {
        if (!reward.position || !reward.features) return false;

        if (typeof reward.features === "string") {
          reward.features = reward.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean);
        }

        return Array.isArray(reward.features);
      });

      if (!validRewards) {
        return customMessage(
          "Each reward must have a position and features array",
          {},
          400
        );
      }
    }

    // Validate criteria
    if (updates.criteria) {
      if (!Array.isArray(updates.criteria)) {
        return customMessage("Criteria must be an array", {}, 400);
      }

      const validCriteria = updates.criteria.every((c) => {
        if (!c.heading || !c.description) return false;
        if (typeof c.description === "string") {
          c.description = c.description
            .split(",")
            .map((d) => d.trim())
            .filter(Boolean);
        }

        return Array.isArray(c.description);
      });

      if (!validCriteria) {
        return customMessage(
          "Each criterion must have a heading and description array",
          {},
          400
        );
      }
    }

    await prisma.contest.update({
      where: { id },
      data: updates,
    });

    return customMessage("Contest updated successfully", { updates }, 200);
  } catch (error) {
    console.error("UPDATE_CONTEST_ERROR:", error);
    return ServerError(error, {}, 500);
  }
};

export const competitionControllers = {
  createNewCompetition,
  getAllCompetitions,
  deleteSingleContest,
  deleteMultipleContest,
  updateSingleContest,
};
