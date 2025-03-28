"use client";

import ChapterTabsComponent from "@/app/(admin)/dashboard/_components/dashboard/chapter-tab-component";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { apiCall } from "@/lib/utils/api";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ChapterEditPage = ({ params }) => {
  const { user } = useAuth();
  const [chapter, setChapter] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!user) {
    redirect(`/auth/login`);
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields?.length;
  const completedFields = requiredFields.filter(Boolean)?.length;
  const completedText = `(${completedFields}/${totalFields})`;

  useEffect(() => {
    const fetchChapterInfo = async () => {
      setLoading(true);
      try {
        const response = await apiCall(
          "get",
          `/training/course/${params.courseId}/chapter/${params.chapterId}`
        );
        setChapter(response.chapter);
      } catch (error) {
        toast.error(`${error.message} || something went wrong`);
      } finally {
        setLoading(false);
      }
    };
    fetchChapterInfo();
  }, [params.chapterId, params.courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[rgba(0,0,0,0.2)]">
        <div className="flex flex-col justify-center items-center mt-20">
          <Loader2 className=" animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 w-full bg-red-300 ">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold">
            Completed Fields : {completedText}
          </p>
          <Button disabled={!completedFields}>Publish Chapter</Button>
        </div>
      </div>
      <div className="p-6 bg-[whitesmoke] min-h-screen">
        <h1>
          Chapter ID : {params.chapterId}: {params.courseId}
        </h1>
        <ChapterTabsComponent
          initialData={chapter}
          chapterId={params.chapterId}
          courseId={params.courseId}
        />
      </div>
    </>
  );
};

export default ChapterEditPage;
