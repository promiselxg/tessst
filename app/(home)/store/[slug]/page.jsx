import { ProductDetailsCard } from "@/components/card/product-details-card";
import Container from "@/components/container/container";
import React from "react";
import { BreadcrumbNav } from "../../../../components/breadcrumb/breadcrumb";
import ProductImages from "../_components/product-images";
import ProductDescriptionCard from "@/components/card/product-description-card";

const product = [
  {
    id: 2,
    name: "Laptop Backpack",
    price: 30000,
    product_images: [
      {
        public_url: "/img/product/1.jpg",
      },
      {
        public_url: "/img/product/2.jpg",
      },
      {
        public_url: "/img/product/3.jpg",
      },
      {
        public_url: "/img/product/4.jpg",
      },
      {
        public_url: "/img/product/5.jpg",
      },
      {
        public_url: "/img/product/6.jpg",
      },
      {
        public_url: "/img/product/7.jpg",
      },
    ],
    category: "Accessories",
    rating: 3,
    stock: 40,
    description:
      'XIAOMI Redmi A3 Pro 6.88" 4GB RAM / 128GB ROM Android 14 - Starry Blue. A budget-friendly device with powerful features and sleek design.',
  },
];

const page = ({ params }) => {
  const singleProduct = product[0];

  return (
    <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px] bg-[whitesmoke]">
      <div className="flex flex-col w-full mx-auto">
        <div className="py-5 bg-neutral-900 mt-[45px] md:mt-0">
          <Container className="w-[90%] md:w-[1300px] mx-auto">
            <BreadcrumbNav
              prev={{ label: "Store", href: "/store" }}
              slug={params.slug}
              className="text-[whitesmoke]"
            />
          </Container>
        </div>
        <Container className="w-[90%] md:w-[1300px] mx-auto">
          <div className="w-full my-5 bg-white md:h-[450px] shadow-sm flex md:gap-10 flex-col md:flex-row rounded-[8px]">
            <div className="w-full md:w-[40%] flex gap-2">
              <ProductImages singleProduct={singleProduct} />
            </div>
            <div className="w-full md:w-[60%] text-[--app-primary-color]  flex items-center">
              <ProductDetailsCard product={singleProduct} />
            </div>
          </div>
          <div className="w-full shadow-sm bg-white  rounded-[8px]">
            <ProductDescriptionCard product={product?.description} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default page;
