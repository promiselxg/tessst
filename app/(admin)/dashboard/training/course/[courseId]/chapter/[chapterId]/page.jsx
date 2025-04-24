import ChapterTabsComponent from "@/app/(admin)/dashboard/_components/dashboard/chapter-tab-component";
import DashboardHeader from "@/app/(admin)/dashboard/_components/dashboard/header";
import Banner from "@/components/banner/banner";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import prisma from "@/lib/utils/dbConnect";
import ChapterCompletedCount from "../_components/chapter-completed-count-form";

const ChapterEditPage = async ({ params }) => {
  const cookieStore = cookies();
  const courseId = params.courseId;
  const chapterId = params.chapterId;

  let userId = null;
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;

      if (!userId) {
        redirect("/auth/login?callbackUrl=/dashboard/training");
      }
    } catch (error) {
      redirect("/auth/login?callbackUrl=/dashboard/training");
    }
  } else {
    redirect("/auth/login?callbackUrl=/dashboard/training");
  }

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId, courseId },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    redirect("/dashboard/training");
  }

  const requiredFields = [chapter.title, chapter.description];

  const totalFields = requiredFields?.length;
  const completedFields = requiredFields.filter(Boolean)?.length;
  const completedText = `(${completedFields}/${totalFields})`;

  const isFieldsCompleted = completedFields === totalFields;

  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    {
      name: "Course setup",
      href: `/dashboard/training/course/${params.courseId}?tab=lessons`,
    },
    { name: "Course chapter setup" },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label={`This chapter is yet to be published therefore won't be visible in the course page.`}
        />
      )}

      <div className="p-6 bg-[whitesmoke] min-h-screen relative">
        <ChapterCompletedCount
          chapter={chapter}
          completedText={completedText}
          isFieldsCompleted={isFieldsCompleted}
        />

        <ChapterTabsComponent
          initialData={chapter}
          chapterId={chapterId}
          courseId={courseId}
        />
      </div>
    </>
  );
};

export default ChapterEditPage;
