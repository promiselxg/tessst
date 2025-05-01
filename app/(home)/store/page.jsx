import { BreadcrumbNav } from "@/components/breadcrumb/breadcrumb";
import Container from "@/components/container/container";
import React from "react";
import ListAllProductsPage from "./_components/all-products";

export const metadata = {
  title: "YSFON | Store",
  description: "YESFON Store",
};

const page = async () => {
  return (
    <>
      <div className="p-[17px] bg-emerald-950 text-white mt-[85px]">
        <Container className="w-[90%] md:w-[1100px] mx-auto">
          <BreadcrumbNav
            prev={{
              label: `store`,
              href: `/store`,
            }}
            className="text-[whitesmoke]"
          />
        </Container>
      </div>
      <div className="w-full flex h-fit py-[40px] md:py-[50px]">
        <div className="flex flex-col w-full mx-auto">
          <ListAllProductsPage />
        </div>
      </div>
    </>
  );
};

export default page;
