import Reveal from "@/components/animation/reveal";
import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import Container from "@/components/container/container";
import ImageViewer from "@/components/image/image-viewer";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <BreadcrumbBanner
        title={params.slug}
        pathname={[{ label: "Projects", href: "/projects" }, { label: "Ok" }]}
        banner="/img/bg.png"
      />
      <div className="w-full flex h-fit py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto flex flex-col mb-10 space-y-5">
            <section className="space-y-4">
              <h1
                className={cn(
                  `${big_sholders_text.className} text-[20px] md:text-[40px] md:-mb-[10px] cursor-pointer w-fit`
                )}
              >
                <Reveal>{params.slug}</Reveal>
              </h1>

              <Reveal>
                <p className="text-sm text-slate-700 line-clamp-3">
                  Donec aliquam ultrices purus, nec laoreet elit scelerisque.
                  Integer eget nisi ultrices, hendrerit urna atnisi ultrices,
                  hendre Donec aliquam ultrices purus, nec laoreet elit
                  scelerisque. Integer eget nisiultrices, hendrerit urna atnisi
                  ultrices, hendre. Donec aliquam ultrices purus, nec laoreet
                  elit scelerisque. Integer eget nisiultrices, hendrerit urna
                  atnisi ultrices, hendre Donec aliquam ultrices purus, nec
                  laoreet elit scelerisque. Integer eget nisiultrices, hendrerit
                  urna atnisi ultrices, hendrerus, nec laoreet elit scelerisque.
                  Integer eget nisiultrices, hendrerit ur.....Donec aliquam
                  ultrices purus, nec laoreet elit scelerisque. Integer eget
                  nisi ultrices, hendrerit urna atnisi ultrices, hendre Donec
                  aliquam ultrices purus, nec laoreet elit scelerisque.{" "}
                </p>
                <p className="text-sm text-slate-700 line-clamp-3">
                  Donec aliquam ultrices purus, nec laoreet elit scelerisque.
                  Integer eget nisi ultrices, hendrerit urna atnisi ultrices,
                  hendre Donec aliquam ultrices purus, nec laoreet elit
                  scelerisque. Integer eget nisiultrices, hendrerit urna atnisi
                  ultrices, hendre. Donec aliquam ultrices purus, nec laoreet
                  elit scelerisque. Integer eget nisiultrices, hendrerit urna
                  atnisi ultrices, hendre Donec aliquam ultrices purus, nec
                  laoreet elit scelerisque. Integer eget nisiultrices, hendrerit
                  urna atnisi ultrices, hendrerus, nec laoreet elit scelerisque.
                  Integer eget nisiultrices, hendrerit ur.....Donec aliquam
                  ultrices purus, nec laoreet elit scelerisque. Integer eget
                  nisi ultrices, hendrerit urna atnisi ultrices, hendre Donec
                  aliquam ultrices purus, nec laoreet elit scelerisque.{" "}
                </p>
              </Reveal>

              <Reveal>
                <ImageViewer
                  src="/img/projects/project-1.png"
                  alt="project image 1"
                  className="w-full h-[250px] md:h-[400px] object-cover rounded-[8px]"
                  defaultClassName={false}
                />
              </Reveal>
            </section>
          </Container>
          <Container className="w-[90%] md:w-[1100px] mx-auto flex flex-col mb-10 space-y-5">
            <Reveal>
              <div className="w-full grid grid-cols-3 gap-8">
                <ImageViewer
                  src="/img/image1.png"
                  alt="project image 1"
                  className="w-full h-[250px] object-cover rounded-[8px]"
                  defaultClassName={false}
                />
                <ImageViewer
                  src="/img/project4.png"
                  alt="project image 2"
                  className="w-full h-[250px] object-cover rounded-[8px]"
                  defaultClassName={false}
                />
                <ImageViewer
                  src="/img/image2.png"
                  alt="project image 3"
                  className="w-full h-[250px] object-cover rounded-[8px]"
                  defaultClassName={false}
                />
              </div>
            </Reveal>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
