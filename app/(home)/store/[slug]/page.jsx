import { ProductDetailsCard } from "@/components/card/product-details-card";
import Container from "@/components/container/container";
import React from "react";
import { BreadcrumbNav } from "../../../../components/breadcrumb/breadcrumb";
import ProductImages from "../_components/product-images";
import ProductDescriptionCard from "@/components/card/product-description-card";
import prisma from "@/lib/utils/dbConnect";

const page = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: { id: params.slug },
    include: {
      tags: true,
      product_variants: true,
      category: true,
    },
  });

  const formattedProduct = {
    ...product,
    price: Number(product.price),
    discount_percent: Number(product.discount_percent),
    product_variants: product.product_variants.map((variant) => ({
      ...variant,
      price: Number(variant.price),
    })),
  };
  return (
    <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px] bg-[whitesmoke]">
      <div className="flex flex-col w-full mx-auto">
        <div className="py-5 bg-neutral-900 mt-[45px] md:mt-0">
          <Container className="w-[90%] md:w-[1300px] mx-auto">
            <BreadcrumbNav
              prev={{ label: "Store", href: "/store" }}
              slug={formattedProduct?.name}
              className="text-[whitesmoke]"
            />
          </Container>
        </div>
        <Container className="w-[90%] md:w-[1300px] mx-auto">
          <div className="w-full my-5 bg-white md:h-[450px] shadow-sm flex md:gap-10 flex-col md:flex-row rounded-[8px]">
            <div className="w-full md:w-[40%] flex gap-2">
              <ProductImages singleProduct={formattedProduct} />
            </div>
            <div className="w-full md:w-[60%] text-[--app-primary-color]  flex items-center">
              <ProductDetailsCard product={formattedProduct} />
            </div>
          </div>
          <div className="w-full shadow-sm bg-white  rounded-[8px]">
            <ProductDescriptionCard description={product?.full_description} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default page;
