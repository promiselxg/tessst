import React from "react";
import ChapterPublishButtonComponent from "./chapter-publish-button-component";

const ChapterCompletedCount = ({
  chapter,
  completedText,
  isFieldsCompleted,
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
        <ChapterPublishButtonComponent
          chapter={chapter}
          isFieldsCompleted={isFieldsCompleted}
        />
      </div>
    </>
  );
};

export default ChapterCompletedCount;
