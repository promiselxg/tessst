import { BreadcrumbNav } from "@/components/breadcrumb/breadcrumb";
import CartItems from "@/components/card/cart-card";
import Container from "@/components/container/container";
import React from "react";

export const metadata = {
  title: "YSFON | Cart",
  description: "YESFON Cart",
};

const page = () => {
  return (
    <div className="w-full flex h-fit py-[40px] md:py-[85px] bg-[whitesmoke]">
      <div className="flex flex-col w-full mx-auto">
        <div className="py-5 bg-emerald-950 mt-[45px] md:mt-0">
          <Container className="w-[90%] md:w-[1300px] mx-auto">
            <BreadcrumbNav
              prev={{ label: "Store", href: "/store" }}
              slug="cart"
              className="text-[whitesmoke]"
            />
          </Container>
        </div>
        <Container className="w-[90%] md:w-[1300px] mx-auto">
          <div className="w-full flex ">
            <CartItems />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default page;
