import { verifyOrder } from "@/actions/order/verify-order";
import { verifyTransaction } from "@/actions/payment/verify-payment";
import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { BiCheckCircle } from "react-icons/bi";

export const metadata = {
  title: "Order Verified",
  description: "Your order has been sucessfully placed.",
};

const page = async ({ searchParams }) => {
  const { reference, method } = searchParams;
  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  if (!reference || !method) redirect("/");

  const verificationResult = await (async () => {
    switch (method.toLowerCase()) {
      case "card":
        return await verifyTransaction(reference);
      case "cash_on_delivery":
        return await verifyOrder(reference);
      default:
        return { success: false };
    }
  })();

  if (!verificationResult?.success) {
    redirect("/store/checkout/failure");
  }

  const order = verificationResult;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Container className="w-full md:w-[700px] md:bg-white md:shadow-sm rounded-lg px-10 md:px-0 py-20 text-center justify-center flex flex-col  items-center">
          <BiCheckCircle size={100} className="text-green-600 mb-4" />
          <h1
            className={cn(
              "text-3xl font-bold mb-2",
              big_sholders_text.className
            )}
          >
            Hi, {capitalizeFirstLetter(order?.name)}
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Your order has been confirmed!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We&apos;ll send you a shipping confirmation email as soon as your
            order ships.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/store">
              <Button className="h-11 px-6 bg-[--app-primary-color] text-white hover:opacity-90 transition">
                Continue Shopping
              </Button>
            </Link>
            <Link href={`/order/status?order_id=${reference}`}>
              <Button className="h-11 px-6 bg-[--course-highlight-bg] text-white hover:opacity-90 transition">
                Check Order Status
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};
export default page;
