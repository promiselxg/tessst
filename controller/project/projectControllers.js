import { customMessage, ServerError } from "@/lib/utils/customMessage";
import { generateSlug } from "@/lib/utils/generateSlug";
import { isValidUUID } from "@/lib/utils/validateUUID";
import sanitize from "sanitize-html";

const createProjectCategory = async (req) => {
  try {
    const { title } = await req.json();

    if (!title) {
      return customMessage("Fill out the required fields.", {}, 400);
    }

    if (
      await prisma.projectCategory.findFirst({
        where: {
          title: sanitize(title),
        },
      })
    ) {
      return customMessage("Project category title already exist.", {}, 409);
    }

    const newCategory = await prisma.projectCategory.create({
      data: {
        title: sanitize(title),
      },
    });

    return customMessage(
      "Project category created successfully.",
      { newCategory },
      201
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

export const createNewProject = async (req) => {
  try {
    const { formData } = await req.json();
    const { title, description, categoryId, mediaType, mediaDoc } = formData;

    // ✅ Required fields
    if (!title || !description || !categoryId || !mediaType) {
      return customMessage("All fields are required.", {}, 400);
    }

    // ✅ Authentication
    if (!req.user || !req.user.id) {
      return customMessage("Unauthorized request.", {}, 401);
    }

    // ✅ Prevent duplicate title
    const existingProject = await prisma.project.findFirst({
      where: { title: sanitize(title) },
    });

    if (existingProject) {
      return customMessage("Project title already exists.", {}, 409);
    }

    // ✅ Validate mediaDoc array
    if (!Array.isArray(mediaDoc) || mediaDoc.length === 0) {
      return customMessage("mediaDoc must be a non-empty array.", {}, 400);
    }

    // ✅ Mixed media validation
    const formattedMedia = mediaDoc.map((item) => {
      if (item.type === "image") {
        if (!item.public_id || !item.public_url) {
          throw new Error("Image must include public_id and public_url.");
        }
        return {
          type: "image",
          publicId: item.public_id,
          public_url: item.public_url,
        };
      }

      if (item.type === "video") {
        if (!item.url || !isValidVideoUrl(item.url)) {
          throw new Error(
            "Video URL must be a valid Mux, YouTube, or Cloudinary link."
          );
        }
        return {
          type: "video",
          url: item.url,
          provider: detectVideoProvider(item.url),
        };
      }

      throw new Error("Unsupported media type in mediaDoc.");
    });

    // ✅ Save to database
    const newProject = await prisma.project.create({
      data: {
        title: sanitize(title),
        description: sanitize(description),
        mediaType: mediaType.toUpperCase(),
        mediaDoc: JSON.parse(JSON.stringify(formattedMedia)),
        slug: generateSlug(title),
        category: { connect: { id: categoryId } },
        userId: req.user.id,
      },
    });

    return customMessage("Project created successfully.", { newProject }, 201);
  } catch (error) {
    return ServerError(
      error.message || "An unexpected error occurred",
      {},
      500
    );
  }
};

const getAllProjectCategories = async (_) => {
  try {
    const allCategories = await prisma.projectCategory.findMany({
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
    return customMessage(
      "Categories retrieved successfully",
      { allCategories },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const getAllProjects = async (req) => {
  const query = req.nextUrl.searchParams;

  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const offset = (page - 1) * limit;

  const search = query.get("search")?.trim().toLowerCase();
  const mediaType = query.get("mediaType")?.trim().toUpperCase();

  let categoryId = query.get("categoryId")?.trim();
  categoryId = isValidUUID(categoryId) ? categoryId : null;

  try {
    //  dynamic filters
    const filters = {};

    if (search) {
      filters.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (categoryId) {
      filters.categoryId = categoryId;
    }

    if (mediaType) {
      filters.mediaType = mediaType;
    }

    const projects = await prisma.project.findMany({
      where: filters,
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        mediaType: true,
        createdAt: true,
        mediaDoc: true,
        category: { select: { id: true, title: true } },
        userId: true,
      },
    });

    const totalCount = await prisma.project.count({ where: filters });

    return customMessage(
      "Projects retrieved successfully",
      { count: projects.length, totalCount, projects },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const getSingleProject = async (req, params) => {
  const { projectId } = await params;
  if (!projectId) {
    return customMessage("Project ID is required", {}, 400);
  }

  if (!isValidUUID(projectId)) {
    return customMessage("Invalid Project ID", {}, 400);
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
        mediaType: true,
        mediaDoc: true,
        category: { select: { id: true, title: true } },
        createdAt: true,
      },
    });

    if (!project) {
      return customMessage("Project not found", {}, 404);
    }

    return customMessage("Project found", { project }, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const updateProjectCategory = async (req, params) => {
  const { categoryId } = await params;

  if (!categoryId) {
    return customMessage("project category ID is required", {}, 400);
  }
  try {
    const { title } = await req.json();
    if (!title) {
      return customMessage("project category title is required", {}, 400);
    }

    if (typeof title !== "string") {
      return customMessage("project category title must be a string", {}, 400);
    }

    if (
      await prisma.projectCategory.findFirst({
        where: {
          title: sanitize(title),
        },
      })
    ) {
      return customMessage("title already exist", {}, 409);
    }

    const category = await prisma.projectCategory.update({
      where: { id: categoryId },
      data: { title: sanitize(title) },
    });

    return customMessage(
      "Project category updated successfully",
      { category },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const updateSingleProject = async (req, params) => {
  try {
    const { projectId } = await params;
    const updates = await req.json();

    if (!projectId) {
      return customMessage("Project ID is required", {}, 400);
    }

    if (!isValidUUID(projectId)) {
      return customMessage("Invalid Project ID", {}, 400);
    }

    if (
      !(await prisma.project.findUnique({
        where: { id: projectId },
      }))
    ) {
      return customMessage("Project not found", {}, 404);
    }

    // Ensure updates contain at least one valid field
    if (Object.keys(updates).length === 0 || updates === null) {
      return customMessage("No update fields provided", {}, 400);
    }

    // Validate category if included
    if (updates.categoryId) {
      const categoryExists = await prisma.projectCategory.findUnique({
        where: { id: updates.categoryId },
      });

      if (!categoryExists) {
        return customMessage("Category does not exist", {}, 400);
      }
    }

    if (updates.mediaType) {
      updates.mediaType = updates.mediaType.toUpperCase();
    }

    if (updates.title) {
      updates.title = sanitize(updates.title);
      updates.slug = generateSlug(updates.title);
    }

    if (updates.description) {
      updates.description = sanitize(updates.description);
    }

    // Handle images update (expects an array of image objects)

    if (updates.mediaDoc) {
      if (!Array.isArray(updates.mediaDoc)) {
        return customMessage("Images must be an array of objects", {}, 400);
      }

      const validImages = updates.mediaDoc.every(
        (img) => img.public_id && img.public_url
      );

      if (!validImages) {
        return customMessage(
          "Each image must have a valid public_id and public_url",
          {},
          400
        );
      }
    }

    await prisma.project.update({
      where: { id: projectId, userId: req.user.id },
      data: updates,
    });

    return customMessage("Project updated successfully", {}, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const deleteProjectCategory = async (req, params) => {
  const { categoryId } = await params;

  if (!categoryId) {
    return customMessage("Category ID is required", {}, 400);
  }

  if (!isValidUUID(categoryId)) {
    return customMessage("Invalid Category ID", {}, 400);
  }

  try {
    const categoryExist = await prisma.projectCategory.findUnique({
      where: { id: categoryId },
      include: { projects: true },
    });

    if (!categoryExist) {
      return customMessage("Category not found or does not exist.", {}, 404);
    }

    await prisma.project.deleteMany({
      where: { categoryId },
    });

    await prisma.projectCategory.delete({
      where: { id: categoryId },
    });

    return customMessage("project category deleted successfully", {}, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const deleteProject = async (req, params) => {
  try {
    const { projectId } = await params;

    if (!projectId) {
      return customMessage("Project ID is required", {}, 400);
    }

    if (!isValidUUID(projectId)) {
      return customMessage("Invalid Project ID", {}, 400);
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return customMessage("Project not found", {}, 404);
    }

    await prisma.project.delete({
      where: { id: projectId, userId: req.user.id },
    });

    return customMessage("Project deleted successfully", {}, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const isValidVideoUrl = (url) => {
  const muxRegex = /^https:\/\/stream\.mux\.com\/[\w-]+/;
  const youtubeRegex = /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\/[\w-]+/;
  const cloudinaryRegex =
    /^https:\/\/res\.cloudinary\.com\/.+\/video\/upload\/.+/;
  return (
    muxRegex.test(url) || youtubeRegex.test(url) || cloudinaryRegex.test(url)
  );
};

function detectVideoProvider(url) {
  if (/stream\.mux\.com/.test(url)) return "mux";
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/res\.cloudinary\.com/.test(url)) return "cloudinary";
  return "unknown";
}
export const projectControllers = {
  createProjectCategory,
  createNewProject,
  getAllProjectCategories,
  getAllProjects,
  getSingleProject,
  updateProjectCategory,
  updateSingleProject,
  deleteProjectCategory,
  deleteProject,
};
