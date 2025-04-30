import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import { ProductCard } from "@/components/card/product-card";
import Container from "@/components/container/container";
import { products } from "@/data/product";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Grid, List } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Store"
        pathname={[{ label: "Store", href: "/store" }]}
        banner="/img/bg.png"
        height="200px"
      />

      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto">
            <h1
              className={cn(
                `${big_sholders_text.className} text-center text-[25px] md:text-[40px] md:text-start font-[700] mb-10`
              )}
            >
              Ecommerce Acceories &amp; Fashion item
            </h1>
          </Container>
          <Container className="w-[90%] md:w-[1100px] mx-auto mb-8">
            <div className="flex w-full justify-between">
              <div>
                <p className="tracking-wide">About 9,620 results.</p>
              </div>
              <div className="flex items-center gap-4">
                <span>View:</span>
                <span>
                  <List />
                </span>
                <span>
                  <Grid />
                </span>
              </div>
            </div>
          </Container>
          <Container className="w-[90%] md:w-[1100px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
