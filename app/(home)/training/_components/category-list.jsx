import { CategoryItem } from "@/components/training/category-item";
import React from "react";

const CategoryList = ({ categories }) => {
  return (
    <ul className="flex gap-2">
      <li className="shrink-0">
        <CategoryItem name="All Categories" />
      </li>
<<<<<<< HEAD
      {categories?.map((category) => (
        <li key={category?.id} className="shrink-0 truncate">
          <CategoryItem name={category?.name} categoryId={category?.id} />
=======
      {categories.map((category) => (
        <li key={category.id} className="shrink-0 truncate">
          <CategoryItem name={category.name} categoryId={category.id} />
>>>>>>> c81a9ca2e0946054da44efaf67fe42ec66e66886
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
