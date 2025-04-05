import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import TabsComponent from "../../../_components/dashboard/course-tap-component";
import DashboardHeader from "../../../_components/dashboard/header";
import CourseCompletedCount from "../../../_components/dashboard/course-completed-count-component";
import Banner from "@/components/banner/banner";

const TrainingPage = async ({ params }) => {
  const cookieStore = cookies();
  const courseId = params.courseId;

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

  const course = await prisma.course.findUnique({
    where: { id: courseId, userId },
    include: {
      chapters: {
        select: {
          id: true,
          courseId: true,
          title: true,
          description: true,
          videoUrl: true,
          position: true,
          isFree: true,
          isPublished: true,
          mediaType: true,
          muxData: true,
          createdAt: true,
        },
        orderBy: { position: "asc" },
      },
      attachments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!course) {
    redirect("/dashboard/training");
  }

  const requiredFields = [
    course?.title,
    course?.description,
    course?.asset,
    course?.categoryId,
    course?.chapters?.some((chapter) => chapter?.isPublished),
  ];

  const totalFields = requiredFields?.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completedText = `(${completedFields}/${totalFields})`;
  const isFieldsCompleted = completedFields === totalFields;

  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Courses", href: "/dashboard/training" },
    { name: "Course setup" },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      {!course?.isPublished && (
        <Banner
          variant="warning"
          label="This course/training is yet to be published and won't be visible to your users."
        />
      )}
      <div className="p-6 bg-[whitesmoke] min-h-screen">
        <CourseCompletedCount
          isPublished={course.isPublished}
          completedText={completedText}
          isFieldsCompleted={isFieldsCompleted}
          courseId={course.id}
        />
        <TabsComponent initialData={course} courseId={course?.id} />
      </div>
    </>
  );
};

export default TrainingPage;
