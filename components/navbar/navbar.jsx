"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import { Button } from "../ui/button";
import HamburgerMenu from "./hamburgerMenu";
import MobileMenu from "./mobileMenu";
import { Badge } from "../ui/badge";
import { useCartStore } from "@/store/cartStore";
import { navLinks } from "@/data/navbar";
import { usePathname, useRouter } from "next/navigation";
import CourseHeaderUserAvatar from "@/app/(home)/resources/training/_components/course-details-header-avatar";
import { useAuth } from "@/context/authProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCartStore();
  const { user } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  const isParentLinkActive = (linkHref) => {
    const parentRoutes = [
      { path: "/store" },
      { path: "/projects" },
      {
        path: "/resources",
        match: ["/resources/training", "/resources/news", "/resources/contest"],
      },
      { path: "/subscription" },
      { path: "/about-us" },
    ];

    for (const { path, match } of parentRoutes) {
      if (linkHref === path || (match && match.includes(linkHref))) {
        return pathname.startsWith(path);
      }
    }

    return pathname === linkHref;
  };

  return (
    <nav className="w-full px-4 py-3 flex items-center justify-between shadow bg-white fixed top-0 left-0 z-50 h-[85px]">
      <div className="container w-[1300px] mx-auto flex items-center justify-between">
        <div className={cn("md:w-1/4", user && "md:w-[20%]")}>
          <Link href="/" className="w-fit cursor-default">
            <Image
              src="/img/ysfon-logo.png"
              alt="ysfon-logo"
              width={80}
              height={80}
              className="cursor-pointer w-[60px] h-[50px] md:w-[75px] md:h-[60px]"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-5 md:gap-10 md:flex-1 justify-between">
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => {
              const isActive = isParentLinkActive(link.href);

              return (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={`font-euclid font-[500] text-base transition-all ${
                      isActive
                        ? "text-[--app-bg-red]"
                        : "text-gray-600 hover:text-[--app-primary-color]"
                    } flex items-center gap-1 `}
                  >
                    {link.label}
                    {link.children && (
                      <svg
                        className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </Link>
                  {link.children && (
                    <div className="absolute left-0 w-48 bg-white shadow-md rounded-md py-2 z-50 hidden group-hover:block">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-5 md:gap-10 ">
            <Link
              href="/cart"
              className={cn(
                "relative items-center hidden md:flex",
                cart?.length === 0 && "pointer-events-none opacity-50",
                cart?.length > 0 && "flex"
              )}
            >
              <MdShoppingCart className="h-7 w-7 text-gray-800" />
              {cart?.length > 0 && (
                <Badge className="absolute -top-1 -right-1 px-[6px] py-[1px] bg-red-500 hover:bg-red-800 text-white text-xs rounded-full transition-all">
                  {cart.length}
                </Badge>
              )}
            </Link>
            <Button
              className="md:px-10 md:h-10 rounded-[8px] bg-[--app-primary-color] text-white transition-all"
              onClick={() => router.push("/donate")}
            >
              Donate
            </Button>
            {user && <CourseHeaderUserAvatar />}
          </div>

          <div className="md:hidden">
            <HamburgerMenu isOpen={isOpen} toggle={toggleMenu} />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />
    </nav>
  );
}
