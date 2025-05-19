import { removeUploadedImage } from "@/lib/utils/cloudinary";
import { customMessage, ServerError } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";

const createNewCategory = async (req) => {
  try {
    const { name } = await req.json();
    if (!name) {
      return customMessage("Category name is required", {}, 400);
    }
    const nameExist = await prisma.category.findFirst({
      where: { name },
    });

    if (nameExist) {
      return customMessage("Category already exists", {}, 409);
    }

    const category = await prisma.category.create({
      data: { name },
    });

    return customMessage("Category created successfully", { category }, 201);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const updateCategory = async (req, params) => {
  const { id } = await params;
  if (!id) {
    return customMessage("Category ID is required", {}, 400);
  }
  try {
    const { name } = await req.json();
    if (!name) {
      return customMessage("Category name is required", {}, 400);
    }
    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return customMessage("Category updated successfully", { category }, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const formatted = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      createdAt: cat.createdAt,
      productCount: cat._count.products,
    }));

    return customMessage(
      "Categories retrieved successfully",
      {
        count: formatted.length,
        categories: formatted,
      },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const deleteCategory = async (_, params) => {
  const { id } = params;

  if (!id) {
    return customMessage("Category ID is required", {}, 400);
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return customMessage("Category not found or does not exist.", {}, 404);
    }

    // Delete all uploaded product images
    for (const product of category.products) {
      if (product.product_main_image) {
        removeUploadedImage(product.product_main_image);
      }
      if (product.product_images && Array.isArray(product.product_images)) {
        product.product_images.forEach((img) => {
          removeUploadedImage(img);
        });
      }
    }

    // Delete all products under the category
    await prisma.product.deleteMany({
      where: { categoryId: id },
    });

    // Delete the category
    await prisma.category.delete({
      where: { id },
    });

    return customMessage("Category deleted successfully", {}, 200);
  } catch (error) {
    console.log(error);
    return ServerError(error, {}, 500);
  }
};

export const categoryControllers = {
  createNewCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
};
