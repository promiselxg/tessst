import React from "react";
import AllCourses from "./_components/course-component";

const page = async ({ searchParams }) => {
  return (
    <>
      <AllCourses params={searchParams} />
    </>
  );
};

export default page;
