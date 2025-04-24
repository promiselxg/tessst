import Container from "@/components/container/container";
import { BreadcrumbNav } from "../../../../components/breadcrumb/breadcrumb";
import { CourseHero } from "./course-hero";

<<<<<<< HEAD
export const CourseHeader = ({ prev, course, loading }) => {
=======
export const CourseHeader = ({ prev, slug }) => {
>>>>>>> c81a9ca2e0946054da44efaf67fe42ec66e66886
  return (
    <div className="w-full bg-[--course-bg]">
      <Container className="md:w-[1000px] p-[--course-padding] text-white">
        <div className="w-full flex gap-6 flex-col">
          <BreadcrumbNav
            prev={prev}
<<<<<<< HEAD
            slug={course?.title}
            className="text-[whitesmoke]"
          />
          <CourseHero course={course} loading={loading} />
=======
            slug={slug}
            className="text-[whitesmoke]"
          />
          <CourseHero slug={slug} />
>>>>>>> c81a9ca2e0946054da44efaf67fe42ec66e66886
        </div>
      </Container>
    </div>
  );
};
