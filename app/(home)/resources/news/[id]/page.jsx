import Reveal from "@/components/animation/reveal";
import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import Container from "@/components/container/container";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaWhatsapp, FaX } from "react-icons/fa6";

const page = ({ params }) => {
  return (
    <>
      <BreadcrumbBanner
        title={params.id}
        pathname={[{ label: "Blog", href: "/news" }, { label: `${params.id}` }]}
        banner="/img/bg.png"
      />
      <div className="w-full flex h-fit py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto flex flex-col mb-10 space-y-5">
            <h1
              className={cn(
                `${big_sholders_text.className} text-[20px] md:text-[40px] md:-mb-[10px] cursor-pointer w-fit`
              )}
            >
              <Reveal>{params.id}</Reveal>
            </h1>
            <Image
              src="/img/image1.png"
              alt="project image 1"
              width={1000}
              height={600}
              priority
              className="w-full h-[250px] md:h-[500px] object-cover rounded-[8px]"
            />
            <div className="w-full flex md:items-center justify-between md:flex-row flex-col">
              <div className="text-sm text-slate-700 flex md:items-center gap-3 md:flex-row flex-col leading-3 md:leading-none">
                <div>
                  <span>Author : </span>
                  <span>Anuforo Okechukwu</span>
                </div>
                <div>
                  <span>Published date : </span>
                  <span>April 21st, 2025</span>
                </div>
              </div>
              <div className="flex items-center  gap-3 text-sm text-slate-700 mt-2 md:mt-0">
                share on :
                <span className="flex items-center  gap-3">
                  <a href="http://">
                    <FaWhatsapp />
                  </a>
                  <a href="http://">
                    <FaFacebook />
                  </a>
                  <a href="http://">
                    <FaX />
                  </a>
                </span>
              </div>
            </div>
            <div className="w-full text-sm leading-relaxed text-slate-700">
              <p>
                Donec aliquam ultrices purus, nec laoreet elit scelerisque.
                Integer eget nisi ultrices, hendrerit urna atnisi ultrices,
                hendre Donec aliquam ultrices purus, nec laoreet elit
                scelerisque. Integer eget nisiultrices, hendrerit urna atnisi
                ultrices, hendre. Donec aliquam ultrices purus, nec laoreet elit
                scelerisque. Integer eget nisiultrices, hendrerit urna atnisi
                ultrices, hendre Donec aliquam ultrices purus, nec laoreet elit
                scelerisque. Integer eget nisiultrices, hendrerit urna atnisi
                ultrices, hendrerus, nec laoreet elit scelerisque. Integer eget
                nisiultrices, hendrerit ur
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
