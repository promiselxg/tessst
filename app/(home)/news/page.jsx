import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import BlogPostCard from "@/components/card/blog-post-card";
import Container from "@/components/container/container";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const page = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Blog"
        pathname={[{ label: "Blog", href: "/news" }]}
        banner="/img/bg.png"
      />
      <div className="w-full flex h-fit md:min-h-screen py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto justify-center items-center flex flex-col mb-10">
            <h1
              className={cn(
                `${big_sholders_text.className} text-center text-[18px] md:text-[40px] md:text-start font-[700]`
              )}
            >
              Latest Articles: Stay Informed
            </h1>
            <p className="text-xs mt-2 md:mt-0 md:text-sm text-slate-700 max-w-[80ch] text-center">
              Stay up to date with our recent event and empowerment programs. We
              bring you up-to-the-minute updates on the most significant events,
              trends, and stories. Discover more program through our up to date
              information.
            </p>
          </Container>
          <Container className="w-[90%] md:w-[1100px] mx-auto bg-[whitesmoke] p-2 rounded-[5px] shadow">
            <BlogPostCard
              title="Youth Empowerment: Why Support Kits Are Crucial"
              description="Many youth lack access to basic tools. This initiative aims to empower them through essential starter kits."
              image="/img/project1.png"
              link="/projects/empowerment"
              layout="row"
              badge="Featured"
              buttons={[
                {
                  label: "Read more",
                  href: "/share/empowerment",
                  variant: "ghost",
                },
              ]}
            />
          </Container>
          <Container className="w-[90%] md:w-[1100px] mx-auto mt-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
              <BlogPostCard
                title="Youth Empowerment: Why Support Kits Are Crucial"
                description="Many youth lack access to basic tools. This initiative aims to empower them through essential starter kits."
                image="/img/image1.png"
                link="/projects/empowerment"
                layout="card"
                badge="Featured"
                buttons={[
                  {
                    label: "Read more",
                    href: "/share/empowerment",
                    variant: "ghost",
                  },
                ]}
              />
              <BlogPostCard
                title="Youth Empowerment: Why Support Kits Are Crucial"
                description="Many youth lack access to basic tools. This initiative aims to empower them through essential starter kits."
                image="/img/image2.png"
                link="/projects/empowerment"
                layout="card"
                badge="Featured"
                buttons={[
                  {
                    label: "Read more",
                    href: "/share/empowerment",
                    variant: "ghost",
                  },
                ]}
              />
              <BlogPostCard
                title="Youth Empowerment: Why Support Kits Are Crucial"
                description="Many youth lack access to basic tools. This initiative aims to empower them through essential starter kits."
                image="/img/project1.png"
                link="/projects/empowerment"
                layout="card"
                badge="Featured"
                buttons={[
                  {
                    label: "Read more",
                    href: "/share/empowerment",
                    variant: "ghost",
                  },
                ]}
              />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default page;
