import Reveal from "@/components/animation/reveal";
import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import Container from "@/components/container/container";
import ImageViewer from "@/components/image/image-viewer";
import VideoPlayer from "@/components/video/videoPlayer";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import prisma from "@/lib/utils/dbConnect";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

const page = async ({ params }) => {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!project) {
    redirect("/projects");
  }
  return (
    <>
      <BreadcrumbBanner
        title={project.title}
        pathname={[{ label: "Projects", href: "/projects" }, { label: "Ok" }]}
        banner="/img/bg.png"
      />
      <div className="w-full flex h-fit py-[40px] md:py-[85px]">
        <div className="flex flex-col w-full mx-auto">
          <Container className="w-[90%] md:w-[1100px] mx-auto flex flex-col mb-10 space-y-5">
            <section className="space-y-4">
              <h1
                className={cn(
                  `${big_sholders_text.className} text-[20px] md:text-[40px] md:-mb-[10px]  w-fit`
                )}
              >
                <Reveal>{project.title}</Reveal>
              </h1>

              <Reveal>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {project.description}
                </p>
              </Reveal>

              <Reveal>
                {/* Render Video if mediaType is VIDEO */}
                {project.mediaType === "VIDEO" &&
                project.mediaDoc?.[0]?.public_url ? (
                  <VideoPlayer
                    src={project.mediaDoc[0].public_url}
                    className="w-full h-[250px] md:h-[400px] object-cover rounded-[8px]"
                  />
                ) : (
                  <ImageViewer
                    src={
                      project.mediaDoc?.[0]?.public_url ||
                      "/img/projects/project-1.png"
                    }
                    alt={project.title}
                    className="w-full h-[250px] md:h-[400px] object-cover rounded-[8px]"
                    defaultClassName={false}
                  />
                )}
              </Reveal>
            </section>
          </Container>

          {project.mediaDoc?.length > 1 && (
            <Container className="w-[90%] md:w-[1100px] mx-auto flex flex-col mb-10 space-y-5">
              <Reveal>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                  {project.mediaDoc.slice(1).map((media, idx) => {
                    return media?.public_url?.endsWith(".mp4") ? (
                      <VideoPlayer
                        key={idx}
                        src={media.public_url}
                        title={`Project video ${idx + 2}`}
                        className="w-full h-[250px] object-cover rounded-[8px]"
                      />
                    ) : (
                      <ImageViewer
                        key={idx}
                        src={media.public_url}
                        alt={`Project image ${idx + 2}`}
                        className="w-full h-[250px] object-cover rounded-[8px]"
                        defaultClassName={false}
                      />
                    );
                  })}
                </div>
              </Reveal>
            </Container>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
