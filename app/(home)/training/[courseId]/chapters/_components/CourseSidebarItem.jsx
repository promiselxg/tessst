"use client";
import { cn } from "@/lib/utils";
import { CheckCircle, Compass, Lock, LockIcon, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  isLocked,
  courseId,
  isActive,
}) => {
  const router = useRouter();
  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  return (
    <button
      onClick={() => router.push(`/training/${courseId}/chapters/${id}`)}
      type="button"
      className={cn(
        "flex items-center text-slate-500 text-sm font-[500] transition-all cursor-pointer h-14  border-slate-100 hover:bg-slate-300/20 pl-4 gap-2",
        isActive &&
          "bg-slate-200/50 text-slate-700  hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <Icon
        size={22}
        className={cn(
          "text-slate-500",
          isActive && "text-slate-700",
          isCompleted && "text-emerald-700"
        )}
      />
      <span>{label}</span>
    </button>
  );
};

export default CourseSidebarItem;
