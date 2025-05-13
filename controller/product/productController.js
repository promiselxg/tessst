import { removeUploadedImage } from "@/lib/utils/cloudinary";
import { customMessage, ServerError } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";
import { isValidUUID } from "@/lib/utils/validateUUID";
import { Prisma } from "@prisma/client";
import sanitizeInput from "sanitize-html";

const createNewProduct = async (req) => {
  try {
    const { formData } = await req.json();

    const {
      name,
      description,
      full_description,
      price,
      categoryId,
      stock,
      discount_order_qty,
      discount_percent,
      manufacturer,
      tags,
      product_variants,
      product_main_image,
      product_images,
    } = formData;

    // Helper function to clean up uploaded images
    const cleanupImages = () => {
      removeUploadedImage(formData.product_main_image);
      removeUploadedImage(formData.product_images);
    };

    // Validate required fields
    if (
      !name ||
      !description ||
      !full_description ||
      !price ||
      !categoryId ||
      !product_main_image ||
      !product_images
    ) {
      cleanupImages();
      return customMessage("All fields are required", {}, 400);
    }

    if (!isValidUUID(categoryId)) {
      return customMessage("Invalid product ID", {}, 400);
    }

    // Validate image structure
    if (!Array.isArray(product_main_image) || !Array.isArray(product_images)) {
      cleanupImages();
      return customMessage("Images must be an array of objects", {}, 400);
    }

    const cleanName = sanitizeInput(name);
    const cleanDescription = sanitizeInput(description);
    const cleanFullDescription = sanitizeInput(full_description);

    const numericPrice = parseFloat(price);

    if (!numericPrice || isNaN(numericPrice) || numericPrice <= 0) {
      cleanupImages();
      return customMessage("Invalid price value", {}, 400);
    }

    const numericStock = Number(stock);
    if (!Number.isInteger(numericStock) || numericStock < 0) {
      cleanupImages();
      return customMessage("Stock must be a non-negative integer", {}, 400);
    }

    // Function to format images
    const formatImages = (images) => {
      return images.map(({ publicId, public_url, assetId }) => {
        if (!publicId || !public_url) {
          cleanupImages();
          throw new Error("Each image must have a publicId and public_url.");
        }
        return { publicId, public_url, assetId };
      });
    };

    const formattedProductMainImage = formatImages(product_main_image);
    const formattedProductImages = formatImages(product_images);

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });

    if (!categoryExists) {
      cleanupImages();
      return customMessage("Category does not exist", {}, 400);
    }

    // Check if product already exists
    if (
      await prisma.product.findUnique({
        where: { name: cleanName, categoryId },
      })
    ) {
      cleanupImages();
      return customMessage(
        `A product with this name "${cleanName}" already exists`,
        {},
        409
      );
    }

    // Create new product
    const productData = {
      name: cleanName,
      description: cleanDescription,
      full_description: cleanFullDescription,
      price: new Prisma.Decimal(numericPrice),
      stock: stock || 0,
      discount_order_qty: discount_order_qty || 0,
      discount_percent: discount_percent || 0,
      manufacturer: manufacturer || null,
      category: { connect: { id: categoryId } },
      product_main_image: formattedProductMainImage,
      product_images: formattedProductImages,
      tags: {
        create: tags?.map((tag) => ({ name: tag })),
      },
    };

    if (product_variants && typeof product_variants === "object") {
      const variantEntries = Object.entries(product_variants).filter(
        ([_, value]) => value !== ""
      );

      if (variantEntries.length > 0) {
        productData.product_variants = {
          create: variantEntries.map(([name, value]) => ({
            name,
            value,
          })),
        };
      }
    }
    const product = await prisma.product.create({ data: productData });

    return customMessage("Product created successfully", { product }, 201);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const getAllProducts = async (req) => {
  const query = req.nextUrl.searchParams;

  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const offset = (page - 1) * limit;

  const search = query.get("search")?.trim().toLowerCase();
  const minPrice = query.get("minPrice")
    ? parseFloat(query.get("minPrice"))
    : null;
  const maxPrice = query.get("maxPrice")
    ? parseFloat(query.get("maxPrice"))
    : null;
  let categoryId = query.get("categoryId")?.trim();
  categoryId = isValidUUID(categoryId) ? categoryId : null;

  try {
    //  dynamic filters
    const filters = {};

    if (search) {
      filters.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (minPrice !== null || maxPrice !== null) {
      filters.price = {};
      if (minPrice !== null) filters.price.gte = minPrice;
      if (maxPrice !== null) filters.price.lte = maxPrice;
    }

    if (categoryId) {
      filters.categoryId = categoryId;
    }

    //  Fetch filtered products
    const products = await prisma.product.findMany({
      where: filters,
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        tags: true,
        product_variants: true,
        category: true,
        reviews: true,
      },
    });

    const totalCount = await prisma.product.count({ where: filters });

    return customMessage(
      "Products retrieved successfully",
      { count: products.length, totalCount, products },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const getSingleProduct = async (req, params) => {
  const { id } = await params;
  if (!id) {
    return customMessage("Product ID is required", {}, 400);
  }

  if (!isValidUUID(id)) {
    return customMessage("Invalid product ID", {}, 400);
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        tags: true,
        product_variants: true,
        category: true,
        reviews: true,
      },
    });

    if (!product) {
      return customMessage("Product not found", {}, 404);
    }

    return customMessage("Product found", { product }, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const updateProduct = async (req, params) => {
  try {
    const { id } = await params;
    const updates = await req.json();

    if (!id) {
      return customMessage("Product ID is required", {}, 400);
    }

    if (!isValidUUID(id)) {
      return customMessage("Invalid product ID", {}, 400);
    }

    if (
      !(await prisma.product.findUnique({
        where: { id },
      }))
    ) {
      return customMessage("Product not found", {}, 404);
    }

    // Ensure updates contain at least one valid field
    if (Object.keys(updates).length === 0 || updates === null) {
      return customMessage("No update fields provided", {}, 400);
    }

    // Validate price if included
    if (updates.price !== undefined) {
      const numericPrice = Number(updates.price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        return customMessage("Invalid price value", {}, 400);
      }

      if (!Number.isInteger(numericPrice * 100)) {
        return customMessage(
          "Price can only have up to 2 decimal places",
          {},
          400
        );
      }

      updates.price = numericPrice;
    }

    // Validate stock if included
    if (updates.stock !== undefined) {
      if (typeof updates.stock !== "number") {
        return customMessage("Stock must be a number", {}, 400);
      }
    }

    // Validate category if included
    if (updates.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: updates.categoryId },
      });

      if (!categoryExists) {
        return customMessage("Category does not exist", {}, 400);
      }
    }

    // Sanitize name
    if (updates.name) {
      updates.name = sanitizeInput(updates.name);
    }

    // full description
    if (updates.full_description) {
      updates.full_description = sanitizeInput(updates.full_description);
    }

    // brief description
    if (updates.description) {
      updates.description = sanitizeInput(updates.description);
    }

    // update images
    if (updates.images) {
      if (!Array.isArray(updates.images)) {
        return customMessage("Images must be an array of objects", {}, 400);
      }

      const validImages = updates.images.every(
        (img) => img.publicId && img.public_url
      );

      if (!validImages) {
        return customMessage(
          "Each image must have a valid publicId and public_url",
          {},
          400
        );
      }

      const formatImages = (images) => {
        return images.map(({ publicId, public_url, assetId }) => {
          if (!publicId || !public_url) {
            removeUploadedImage(updates.oldImage);
            throw new Error("Each image must have a publicId and public_url.");
          }
          return { publicId, public_url, assetId };
        });
      };
      const formattedProductMainImage = formatImages(updates.images);
      removeUploadedImage(updates.oldImage);

      if (updates.type === "product_main_image") {
        updates.product_main_image = formattedProductMainImage;
      } else {
        updates.product_images = formattedProductMainImage;
      }

      delete updates.images;
      delete updates.oldImage;
      delete updates.type;
    }

    // tags
    if (updates.tags) {
      if (!Array.isArray(updates.tags)) {
        return customMessage("Tags must be an array of objects", {}, 400);
      }

      const validTags = updates.tags.every(
        (tag) => typeof tag.name === "string"
      );

      if (!validTags) {
        return customMessage("Each tag must have a name property", {}, 400);
      }

      // Get existing tags linked to the product
      const existingTags = await prisma.productTag.findMany({
        where: { productId: id },
        select: { id: true, name: true },
      });

      // Identify tags to disconnect
      const tagsToDisconnect = existingTags
        .filter(
          (existingTag) =>
            !updates.tags.some((tag) => tag.name === existingTag.name)
        )
        .map((tag) => ({ id: tag.id }));

      // Disconnect removed tags
      await prisma.productTag.deleteMany({
        where: { id: { in: tagsToDisconnect.map((tag) => tag.id) } },
      });

      // Upsert tags (Create if they don't exist)
      await Promise.all(
        updates.tags.map(async (tag) => {
          await prisma.productTag.upsert({
            where: { name: tag.name },
            update: {},
            create: { name: tag.name, productId: id },
          });
        })
      );

      delete updates.tags;
    }

    // Product variants

    if (updates.variants) {
      if (!Array.isArray(updates.variants)) {
        return customMessage("Variants must be an array of objects", {}, 400);
      }

      // Ensure each variant has both 'name' and 'value'
      const validVariants = updates.variants.every(
        (variant) => variant.name && variant.value
      );

      if (!validVariants) {
        return customMessage(
          "Each variant must have a name and value",
          {},
          400
        );
      }

      // Delete existing variants that are not in the new update
      await prisma.productVariant.deleteMany({
        where: {
          productId: id,
          NOT: {
            id: {
              in: updates.variants.map((variant) => id).filter(Boolean),
            },
          },
        },
      });

      // Upsert new or updated product variants
      await Promise.all(
        updates.variants.map(async (variant) => {
          let variantName = variant.name;
          if (variantName === "product_variant_color") {
            variantName = "color";
          } else if (variantName === "product_variant_size") {
            variantName = "size";
          }

          await prisma.productVariant.upsert({
            where: { id },
            update: { name: variantName, value: variant.value },
            create: {
              name: variantName,
              value: variant.value,
              productId: id,
            },
          });
        })
      );

      delete updates.variants;
    }

    await prisma.product.update({
      where: { id },
      data: updates,
    });

    return customMessage("Product updated successfully", {}, 200);
  } catch (error) {
    console.log(error);
    return ServerError(error, {}, 500);
  }
};

const deleteProduct = async (req, params) => {
  try {
    const { id } = await params;
    if (!id) {
      return customMessage("Product ID is required", {}, 400);
    }

    if (!isValidUUID(id)) {
      return customMessage("Invalid product ID", {}, 400);
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return customMessage("Product not found", {}, 404);
    }

    removeUploadedImage(product.product_main_image);
    removeUploadedImage(product.product_images);

    await prisma.product.delete({
      where: { id },
    });

    return customMessage("Product deleted successfully", {}, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const deleteMultipleProducts = async (req) => {
  try {
    const idsObj = await req.json();

    if (!idsObj || typeof idsObj !== "object") {
      return customMessage("No product IDs provided", {}, 400);
    }

    const ids = Object.values(idsObj);

    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
    });

    const invalidIds = ids.filter((id) => !isValidUUID(id));
    if (invalidIds.length > 0) {
      return customMessage("One or more invalid product IDs", {}, 400);
    }

    if (products.length === 0) {
      return customMessage("No products found for the provided IDs", {}, 404);
    }

    for (const product of products) {
      if (!product) {
        return customMessage("Product not found", {}, 404);
      }
      removeUploadedImage(product.product_main_image);
      removeUploadedImage(product.product_images);
    }

    await prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return customMessage("Products deleted successfully", {}, 200);
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

export const productControllers = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteMultipleProducts,
};
