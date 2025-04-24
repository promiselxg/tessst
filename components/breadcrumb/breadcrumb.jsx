import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
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
              <Link href={prev.href}>{prev.label}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </>
      )}
      {slug && (
        <BreadcrumbItem>
          <BreadcrumbPage className={cn("italic line-clamp-1", className)}>
            {slug}
          </BreadcrumbPage>
        </BreadcrumbItem>
      )}
    </BreadcrumbList>
  </Breadcrumb>
);
