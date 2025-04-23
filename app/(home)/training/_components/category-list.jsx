import { CategoryItem } from "@/components/training/category-item";
import React from "react";

const CategoryList = ({ categories }) => {
  return (
    <ul className="flex gap-2">
      <li className="shrink-0">
        <CategoryItem name="All Categories" />
      </li>
      {categories.map((category) => (
        <li key={category.id} className="shrink-0 truncate">
          <CategoryItem name={category.name} categoryId={category.id} />
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
