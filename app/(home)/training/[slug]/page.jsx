import React from "react";
import { CourseHeader } from "../_components/course-header";
import { CourseContent } from "../_components/course-single-content";

const page = ({ params }) => {
  return (
    <div className="w-full flex h-fit md:min-h-[500px] py-[40px] md:py-[85px] flex-col">
      <CourseHeader
        prev={{ label: "All Products", href: "/training" }}
        slug={params.slug}
      />
      <CourseContent />
    </div>
  );
};

export default page;
