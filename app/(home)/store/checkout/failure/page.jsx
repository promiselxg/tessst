import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import Link from "next/link";
import React from "react";
import { FiXCircle } from "react-icons/fi";

export const metadata = {
  title: "Invalid Order Reference",
  description: "The order reference number you entered is invalid.",
};

const page = async ({ searchParams }) => {
  const { reference } = searchParams;
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Container className="w-full md:w-[700px] md:bg-white md:shadow-sm rounded-lg px-10 py-20 text-center justify-center flex flex-col  items-center">
          <FiXCircle size={100} className="text-[--app-bg-red] mb-4" />
          {reference && (
            <h1
              className={cn(
                "text-3xl font-bold mb-2",
                big_sholders_text.className
              )}
            >
              Ref No.: {reference}
            </h1>
          )}
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Invalid or Unrecognized Order Reference
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We couldn&apos;t find an order matching the reference number you
            provided. If you believe this is a mistake, please double-check and
            try again. We&apos;ll notify you via email once your order ships.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/store">
              <Button className="h-11 px-6 bg-[--app-primary-color] text-white hover:opacity-90 transition">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};
export default page;
