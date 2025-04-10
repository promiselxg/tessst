import Reveal from "@/components/animation/reveal";
import Container from "@/components/container/container";

export const CourseContent = () => (
  <Container className="md:w-[1000px] p-[--course-padding] text-neutral-900">
    <Reveal>
      <div className="w-full border bg-white p-5 border-[rgba(0,0,0,0.1)]">
        <h1 className="text-[20px] md:text-[30px] font-[600] mb-3 text-slate-700">
          About this course
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed">
          In this free 14 hour tutorial you are going to learn how to build a
          Twitch Clone using Next 14. We are going to start with the basics like
          configuring Next.js, learning the routing concepts, and then slowly go
          deeper into setting up authentication, database, local tunnels,
          webhooks, all the way to generating RTMP and WHIP connections to
          connect to our OBS streaming software.
        </p>
      </div>
    </Reveal>
  </Container>
);
