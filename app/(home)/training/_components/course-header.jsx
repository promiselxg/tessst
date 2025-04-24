import Container from "@/components/container/container";
import { BreadcrumbNav } from "../../../../components/breadcrumb/breadcrumb";
import { CourseHero } from "./course-hero";

export const CourseHeader = ({ prev, course, loading }) => {
  return (
    <div className="w-full bg-[--course-bg]">
      <Container className="md:w-[1000px] p-[--course-padding] text-white">
        <div className="w-full flex gap-6 flex-col">
          <BreadcrumbNav
            prev={prev}
            slug={course?.title}
            className="text-[whitesmoke]"
          />
          <CourseHero course={course} loading={loading} />
        </div>
      </Container>
    </div>
  );
};
