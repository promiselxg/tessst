"use client";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { Button } = require("../ui/button");

export const CategoryItem = ({ name, categoryId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentSearchKeyword = searchParams.get("title");

  const isActive = currentCategoryId === categoryId;
  const isAllCategory = name === "All Categories";

  const isAllCategoryActive = isAllCategory && !currentCategoryId;

  const handleClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isActive ? null : categoryId,
          title: currentSearchKeyword,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };
  return (
    <Button
      onClick={handleClick}
      className={cn(
        "px-4 py-2 text-[12px] rounded-[5px] border active:scale-95 transition-all duration-200 truncate",
        isAllCategoryActive || isActive
          ? "bg-[--app-primary-color] text-white border-[rgba(0,0,0,0.1)]"
          : "bg-white text-[--app-primary-color] border-[rgba(0,0,0,0.2)] hover:text-white hover:bg-sky-700 hover:border-[rgba(0,0,0,0.1)]"
      )}
    >
      {name}
    </Button>
  );
};
