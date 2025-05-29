"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Reveal from "@/components/animation/reveal";
import { big_sholders_text } from "@/lib/fonts";
import VideoPlayer from "@/components/video/videoPlayer";
import { getAllProjects } from "@/service/project/projectService";

const ProjectSkeleton = () => (
  <section className="space-y-4 animate-pulse">
    <div className="h-[40px] bg-slate-200 rounded w-2/3" />
    <div className="h-4 bg-slate-200 rounded w-full" />
    <div className="h-4 bg-slate-200 rounded w-5/6" />
    <div className="h-[250px] md:h-[400px] bg-slate-300 rounded-[8px]" />
  </section>
);

const Listprojects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setLoading(true);
        const response = await getAllProjects();
        setProjects(response.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  console.log(projects);
  return (
    <>
      {loading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <ProjectSkeleton key={idx} />
          ))
        : projects?.map((project) => (
            <section key={project.id} className="space-y-4">
              <Link href={`/projects/${project.slug}`}>
                <h1
                  className={cn(
                    `${big_sholders_text.className} text-[20px] md:text-[40px] md:-mb-[10px] cursor-pointer w-fit`
                  )}
                >
                  <Reveal>{project.title}</Reveal>
                </h1>
              </Link>

              <Reveal direction="up">
                <p className="text-sm text-slate-700 line-clamp-3">
                  {project.description}
                </p>
              </Reveal>

              <Reveal>
                <Link href={`/projects/${project?.slug}`}>
                  {project.mediaType.toLowerCase() === "video" ? (
                    <VideoPlayer
                      src={project.mediaDoc[0].public_url}
                      className="w-full h-[250px] md:h-[400px] object-cover rounded-[8px]"
                    />
                  ) : (
                    <Image
                      src={
                        project.mediaDoc?.[0]?.public_url || "/img/fallback.jpg"
                      }
                      alt={project.title}
                      width={1000}
                      height={600}
                      priority
                      className="w-full h-[250px] md:h-[400px] object-cover rounded-[8px]"
                    />
                  )}
                </Link>
              </Reveal>
            </section>
          ))}
    </>
  );
};

export default Listprojects;
