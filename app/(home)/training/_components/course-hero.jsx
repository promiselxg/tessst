import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/utils/getDateDifference";
import { BookOpen, Clock, VideoIcon } from "lucide-react";

export const CourseHero = ({ course, loading }) => (
  <div className="w-full flex gap-5 items-center flex-col md:flex-row">
    <div className="w-full md:w-[60%] mb-5 md:mb-0">
      {loading ? (
        <>
          <Skeleton className="h-2 w-full bg-sky-700 rounded-full" />
        </>
      ) : (
        <>
          <h1 className="font-euclid font-[500] text-[20px] md:text-[30px] md:leading-[1.3em]">
            {course?.title}
          </h1>
        </>
      )}
      <div className="py-5 flex md:items-center gap-2 italic text-sm flex-col md:flex-row">
        {loading ? (
          <>
            <Skeleton className="h-2 w-full bg-sky-700 rounded-full" />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> {course?.chapters?.length}{" "}
              Chapters
            </div>
            <div className="flex items-center gap-2 text-sm tracking-wider font-[400]">
              <Clock className="w-4 h-4" />
              Last updated{" "}
              <span className="font-[600]">
                {formatDateTime(course?.updatedAt)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>

    <div className="w-full md:w-[40%] bg-[--course-highlight-bg] justify-end flex rounded-[8px] flex-col px-6 py-5">
      <h1 className="text-[18px]">Ready to Start Learning?</h1>
      <p className="text-sm text-[--course-text-color] mt-2">
        Track your progress, watch with subtitles, change quality, and lots
        more.
      </p>
      <Button
        className="bg-[--app-primary-color] text-white text-sm mt-3 transition-all"
        disabled={loading}
      >
        <VideoIcon />
        Start learning
      </Button>
    </div>
  </div>
);
