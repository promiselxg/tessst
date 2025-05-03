import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { truncateText } from "@/lib/utils/trucateText";
import Link from "next/link";

export const BreadcrumbNav = ({
  prev = { label: "", href: "/training" },
  slug,
  className,
}) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink
          asChild
          className="hover:text-[whitesmoke] transition-all"
        >
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      {prev.label && (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="hover:text-[whitesmoke] transition-all"
            >
              <Link href={prev.href} className="line-clamp-1">
                {prev.label}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </>
      )}
      {slug && (
        <div className="flex items-center gap-2">
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className={cn("italic line-clamp-1", className)}>
              <span className="flex md:hidden">{truncateText(slug, 25)}</span>
              <span className="hidden md:flex">{slug}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </div>
      )}
    </BreadcrumbList>
  </Breadcrumb>
);
