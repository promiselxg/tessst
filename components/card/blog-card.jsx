import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { big_sholders_text } from "@/lib/fonts";

const BlogCard = ({ image, date, title, desc, isLarge = false }) => {
  return (
    <div
      className={cn(
        "w-full",
        isLarge ? "md:w-[40%]" : "md:h-[200px] flex gap-4 flex-col md:flex-row"
      )}
    >
      <div
        className={
          isLarge
            ? "h-fit md:h-[450px] w-full"
            : "w-full md:w-[250px] md:h-[200px]"
        }
      >
        <Image
          src={image}
          alt={title}
          width={isLarge ? 450 : 200}
          height={isLarge ? 450 : 200}
          className="w-full object-cover"
        />
      </div>

      <div className="space-y-1">
        <p className="mt-5 text-sm font-euclid text-slate-700">{date}</p>
        <Link href="">
          <h1
            className={cn(
              `${big_sholders_text.className} ${
                isLarge ? "text-[20px]" : "text-[16px]"
              } font-[600] w-fit`
            )}
          >
            {title}
          </h1>
        </Link>
        <p className="text-[--app-primary-text] font-euclid text-[12px] md:text-sm">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
