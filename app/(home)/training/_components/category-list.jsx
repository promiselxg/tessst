import CategoryItemSkeleton from "@/components/skeleton/course-category-skeleton";
import { CategoryItem } from "@/components/training/category-item";
import React from "react";

const CategoryList = ({ categories, isLoading }) => {
  return (
    <ul className="flex gap-2">
      <li className="shrink-0">
        <CategoryItem name="All Categories" />
      </li>

      {isLoading
        ? [...Array(8)].map((_, i) => (
            <li key={i} className="shrink-0">
              <CategoryItemSkeleton />
            </li>
          ))
        : categories?.map((category) => (
            <li key={category?.id} className="shrink-0 truncate">
              <CategoryItem name={category?.name} categoryId={category?.id} />
            </li>
          ))}
    </ul>
  );
};

export default CategoryList;
