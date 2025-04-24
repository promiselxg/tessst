"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: categoryId,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [categoryId, debouncedValue, pathname, router]);

  return (
    <div className="relative flex items-center mt-10 md:mt-0">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="h-5 w-5 text-slate-700" />
      </span>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-10 h-12 rounded-[10px] tracking-wide w-full"
        placeholder="Search courses"
      />
    </div>
  );
};

export default SearchInput;
