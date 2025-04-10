import { Button } from "@/components/ui/button";
import { BookOpen, Clock, VideoIcon } from "lucide-react";

export const CourseHero = ({ slug }) => (
  <div className="w-full flex gap-5 items-center flex-col md:flex-row">
    <div className="w-full md:w-[60%] mb-5 md:mb-0">
      <h1 className="font-euclid font-[500] text-[20px] md:text-[30px] md:leading-[1.3em]">
        {slug}
      </h1>
      <div className="py-5 flex items-center gap-2 italic text-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> 38 Chapters
        </div>
        <div className="flex items-center gap-2">
          <span className="font-[400] tracking-wider">Created by :</span>
          <span className="font-[400] tracking-wider">Anuforo O.</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm tracking-wider font-[400]">
        <Clock className="w-4 h-4" />
        Last updated <span className="font-[600]">Aug 5th, 2025</span>
      </div>
    </div>

    <div className="w-full md:w-[40%] bg-[--course-highlight-bg] justify-end flex rounded-[8px] flex-col px-6 py-5">
      <h1 className="text-[18px]">Ready to Start Learning?</h1>
      <p className="text-sm text-[--course-text-color] mt-2">
        Track your progress, watch with subtitles, change quality, and lots
        more.
      </p>
      <Button className="bg-[--app-primary-color] text-white text-sm mt-3 transition-all">
        <VideoIcon />
        Start learning
      </Button>
    </div>
  </div>
);
