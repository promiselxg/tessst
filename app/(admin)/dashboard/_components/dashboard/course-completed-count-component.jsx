import React from "react";
import CoursePublishButtonComponent from "./course-publish-button-component";

const CourseCompletedCount = ({
  isPublished,
  completedText,
  isFieldsCompleted,
  courseId,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2 mt-3">
            <h2 className="text-2xl">Customize this training course.</h2>
          </div>
          <span className="text-sm text-slate-700 italic font-bold">
            Complete all required fields {completedText}
          </span>
        </div>
        <CoursePublishButtonComponent
          isPublished={isPublished}
          isFieldsCompleted={isFieldsCompleted}
          courseId={courseId}
        />
      </div>
    </>
  );
};

export default CourseCompletedCount;
