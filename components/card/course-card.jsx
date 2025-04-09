import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export const CourseCard = ({ course, href }) => {
  return (
    <div className="w-full cursor-pointer">
      <Image
        src={course.image}
        width={500}
        height={300}
        alt={course.title}
        className="w-full h-[200px] object-cover rounded-t-lg"
      />

      <div className="p-4 bg-white rounded-b-lg space-y-2 shadow border border-[rgba(0,0,0,0.1)]">
        <Link
          href={href}
          className={cn(
            `${course.font} text-[--app-primary-color] text-[20px] font-[300] break-words line-clamp-1`
          )}
        >
          {course.title}
        </Link>

        <div className="flex items-center gap-2 text-sm font-euclid">
          <div className="flex items-center gap-2 ">
            <BookOpen className="h-4 w-4" />
            {course.chapters} Chapters
          </div>
        </div>
      </div>
    </div>
  );
};
