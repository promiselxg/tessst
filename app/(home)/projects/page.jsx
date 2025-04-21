import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import SectionBlock from "@/components/card/section-block-card";
import Container from "@/components/container/container";
import React from "react";

const page = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Projects"
        pathname={[{ label: "Projects", href: "/projects" }]}
        banner="/img/bg.png"
      />
      <div className="w-full flex h-fit py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto flex flex-col mb-10 space-y-5">
            <SectionBlock
              title="Operation Kitsyour ballers"
              description="Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisi ultrices, hendrerit urna atnisi ultrices, hendre Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisiultrices, hendrerit urna atnisi ultrices, hendre. Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisiultrices, hendrerit urna atnisi ultrices, hendre Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisiultrices, hendrerit urna atnisi ultrices, hendrerus, nec laoreet elit scelerisque. Integer  eget nisiultrices, hendrerit ur....."
              imageSrc="/img/projects/project-1.png"
              url="/projects/project-name-goes-here"
              imageAlt="project 1"
              imagePriority
            />
            <SectionBlock
              title="Operation Kitsyour ballers"
              description="Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisi ultrices, hendrerit urna atnisi ultrices, hendre Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisiultrices, hendrerit urna atnisi ultrices, hendre. Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisiultrices, hendrerit urna atnisi ultrices, hendre Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisiultrices, hendrerit urna atnisi ultrices, hendrerus, nec laoreet elit scelerisque. Integer  eget nisiultrices, hendrerit ur....."
              imageSrc="/img/image1.png"
              url="/projects/project-name-goes-here"
              imageAlt="project 1"
              imagePriority
            />
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
