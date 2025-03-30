"use client";
import { useState } from "react";
import VideoFileUpload from "../document/video-upload";
import VideoPlayer from "../video/videoPlayer";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const ChapterVideoUploadForm = ({
  initialData,
  chapterId,
  onSuccessfulSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button
          variant="ghost"
          onClick={() => toggleEdit()}
          className=" cursor-pointer flex items-center"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mt-1 h-4 w-4 cursor-pointer" />
              change video
            </>
          )}
        </Button>
      </div>
      <div className="mt-6 border bg-slate-100 rounded-md p-4 transition-all">
        {isEditing && (
          <VideoFileUpload
            chapterId={chapterId}
            courseId={initialData?.courseId}
            onSuccessfulSubmit={onSuccessfulSubmit}
          />
        )}
        {!isEditing && initialData?.videoUrl === "" && (
          <p className="text-sm mt-2 text-slate-500 italic">
            No video uploaded yet
          </p>
        )}
        {!isEditing && initialData?.videoUrl && (
          <VideoPlayer url={initialData.videoUrl} />
        )}
      </div>
    </div>
  );
};

export default ChapterVideoUploadForm;
