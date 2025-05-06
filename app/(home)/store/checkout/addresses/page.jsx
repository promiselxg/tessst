import Link from "next/link";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import CheckoutSummary from "../../_components/checkout/checkout-summary";
import Container from "@/components/container/container";
import { BreadcrumbNav } from "@/components/breadcrumb/breadcrumb";
import AddressBook from "../_component/address-book";
import CheckoutStepHeader from "../../_components/checkout/checkout-step-header";
import { CheckCircle2 } from "lucide-react";
import ProtectedRouteWrapper from "@/middleware/protectedRoute";

const page = () => {
  return (
    <ProtectedRouteWrapper>
      <div className="w-full flex h-fit py-[40px] md:py-[85px] bg-[whitesmoke]">
        <div className="flex flex-col w-full mx-auto">
          <div className="py-5 bg-emerald-950 mt-[45px] md:mt-0">
            <Container className="w-[90%] md:w-[1300px] mx-auto">
              <BreadcrumbNav
                prev={{ label: "Checkout", href: "/store/checkout" }}
                slug="Customer Address"
                className="text-[whitesmoke]"
              />
            </Container>
          </div>
          <Container className="w-[90%] md:w-[1300px] mx-auto">
            <div className="w-full flex justify-between gap-5 h-fit mt-10 flex-col md:flex-row">
              <div className="w-full md:w-[75%] flex flex-col gap-4">
                <AddressBook />
                <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
                  <CheckoutStepHeader
                    icon={CheckCircle2}
                    label="2. Delivery Address"
                  />
                </div>
                <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
                  <CheckoutStepHeader
                    icon={CheckCircle2}
                    label="3. Payment method"
                  />
                </div>
              </div>
              <div className="w-full md:w-[25%]">
                <CheckoutSummary />
              </div>
            </div>
            <div className="w-fit mt-5">
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
  );
};

export default page;
