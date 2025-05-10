import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import Container from "@/components/container/container";
import React from "react";
import Listprojects from "./_components/projects";

export const metadata = {
  title: "YSFON | Projects",
  description: "YESFON Projects",
};

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
            <Listprojects />
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
