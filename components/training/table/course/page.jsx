"use client";
import { useAuth } from "@/context/authProvider";
import { columns } from "./columns";
import { CourseTable } from "./data-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/utils/api";

const CourseDataTable = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { user } = useAuth();
  const fetchAllCourse = async () => {
    try {
      setLoading(true);
      const response = await apiCall("get", "/training/course");
      setCourse(response.courses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourse();
  }, []);

  useEffect(() => {
    if (!user.id) {
      router.replace(`/auth/login`);
    }
  }, [user.id, router]);

  return (
    <div className="container mx-auto  bg-white shadow p-4 rounded-[8px]">
      <CourseTable columns={columns} data={course} loading={loading} />
    </div>
  );
};

export default CourseDataTable;
