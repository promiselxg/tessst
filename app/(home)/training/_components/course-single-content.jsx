import Reveal from "@/components/animation/reveal";
import Container from "@/components/container/container";

export const CourseContent = ({ description }) => (
  <Container className="md:w-[1000px] p-[--course-padding] text-neutral-900">
    <Reveal>
      <div className="w-full border bg-white p-5 border-[rgba(0,0,0,0.1)]">
        <h1 className="text-[20px] md:text-[30px] font-[600] mb-3 text-slate-700">
          About this course
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
      </div>
    </Reveal>
  </Container>
);
