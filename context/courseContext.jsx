"use client";
import useCourseStore from "@/store/courseStore";
import { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const { course, loading, fetchCourseInfo } = useCourseStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CourseContext.Provider value={{ course, loading, fetchCourseInfo }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
