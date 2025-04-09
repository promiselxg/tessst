import { cn } from "@/lib/utils";

const { Button } = require("../ui/button");

export const CategoryItem = ({ name, active }) => {
  return (
    <Button
      className={cn(
        "px-4 py-2 text-[12px] rounded-[5px] border active:scale-95 transition-all duration-200",
        active
          ? "bg-[--app-primary-color] text-white border-[rgba(0,0,0,0.1)]"
          : "bg-white text-[--app-primary-color] border-[rgba(0,0,0,0.2)] hover:text-white hover:bg-sky-700 hover:border-[rgba(0,0,0,0.1)]"
      )}
    >
      {name}
    </Button>
  );
};
