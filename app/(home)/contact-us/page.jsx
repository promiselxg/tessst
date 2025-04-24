import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import Container from "@/components/container/container";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { FaSquareXTwitter, FaTiktok } from "react-icons/fa6";
import ContactUsForm from "../_components/contact/contact-us-form";
import { Mail, Phone } from "lucide-react";

const page = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Contact Us"
        pathname={[{ label: "Contact Us", href: "/contact-us" }]}
        banner="/img/bg.png"
      />
      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto flex gap-10 flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2 flex gap-y-2 flex-col">
              <h1 className="font-[600] text-[20px]">Office Address</h1>
              <p className="text-sm">
                19, Idi Araba, Block J, Apple Apata Estate, Lagos Island
              </p>
              <p className="flex gap-2 items-center">
                <Mail className="w-4 h-4" />
                info@email.com
              </p>
              <div
                className={cn(
                  `${big_sholders_text.className} flex flex-col text-[20px] mt-1`
                )}
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +2348030000000
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +2348030000000
                </span>
              </div>
              <div className="flex flex-col mt-1 space-y-2">
                <a href="http://">
                  <span className="flex items-center gap-2">
                    <FiFacebook className="w-5 h-5" />
                    Facebook
                  </span>
                </a>
                <a href="http://">
                  <span className="flex items-center gap-2">
                    <FiInstagram className="w-5 h-5" />
                    Instagram
                  </span>
                </a>
                <a href="http://">
                  <span className="flex items-center gap-2">
                    <FaSquareXTwitter className="w-5 h-5" />X (formerly Twitter)
                  </span>
                </a>
                <a href="http://">
                  <span className="flex items-center gap-2">
                    <FaTiktok className="w-5 h-5" />
                    Tiktok
                  </span>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <ContactUsForm />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
