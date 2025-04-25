"use client";

import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import CloudinaryVideoPlayer from "./cloudinary-video-player";

const CourseVideoPlayer = ({
  videoUrl,
  title,
  isLocked,
  courseId,
  chapterId,
  nextChapterId,
  purchaseId,
  completeOnEnd,
  publicId,
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video ">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8 text-secondary" />
          <p className="text-sm ">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <CloudinaryVideoPlayer
          id={courseId}
          publicId={publicId}
          playerConfig={{
            posterOptions: {
              transformation: { effect: "blur" },
            },
          }}
          sourceConfig={{
            info: { title: title },
            sourceTypes: ["hls", "webm/vp9", "mp4/h265"],
          }}
        />
      )}
    </div>
  );
};

export default CourseVideoPlayer;
