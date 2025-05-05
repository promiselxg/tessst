import { BreadcrumbNav } from "@/components/breadcrumb/breadcrumb";
import Container from "@/components/container/container";
import React from "react";

import CheckOutLoggedInUserAccountInfo from "../_components/checkout/checkout-user-address";
import CheckouDeliveryAddress from "../_components/checkout/checkout-selected-delivery-address";
import CheckoutSelectedPaymentMethod from "../_components/checkout/checkout-selected-payment-method";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import CheckoutSummary from "../_components/checkout/checkout-summary";
import ProtectedRouteWrapper from "@/middleware/protectedRoute";

const page = () => {
  return (
    <>
      <ProtectedRouteWrapper>
        <div className="w-full flex h-fit py-[40px] md:py-[85px] bg-[whitesmoke]">
          <div className="flex flex-col w-full mx-auto">
            <div className="py-5 bg-emerald-950 mt-[45px] md:mt-0">
              <Container className="w-[90%] md:w-[1300px] mx-auto">
                <BreadcrumbNav
                  prev={{ label: "Cart", href: "/cart" }}
                  slug="checkout"
                  className="text-[whitesmoke]"
                />
              </Container>
            </div>
            <Container className="w-[90%] md:w-[1300px] mx-auto">
              <div className="w-full flex justify-between gap-5 h-fit mt-10 flex-col md:flex-row">
                <div className="w-full md:w-[75%] flex flex-col gap-4">
                  <CheckOutLoggedInUserAccountInfo />
                  <CheckouDeliveryAddress />
                  <CheckoutSelectedPaymentMethod />
                </div>
                <div className="w-full md:w-[25%]">
                  <CheckoutSummary />
                </div>
              </div>
              <div className="w-full mt-5">
                <Link
                  href="/store"
                  className="flex items-center gap-1 text-blue-600 text-xs hover:underline"
                >
                  <FiChevronLeft />
                  Go back &amp; continue shopping
                </Link>
              </div>
            </Container>
          </div>
        </div>
      </ProtectedRouteWrapper>
    </>
  );
};

export default page;
