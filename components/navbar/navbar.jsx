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
import CourseHeaderUserAvatar from "@/app/(home)/training/_components/course-details-header-avatar";
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
    if (linkHref === "/store") {
      return pathname.startsWith("/store");
    }
    if (linkHref === "/projects") {
      return pathname.startsWith("/projects");
    }
    if (linkHref === "/training") {
      return pathname.startsWith("/training");
    }
    if (linkHref === "/pro") {
      return pathname.startsWith("/pro");
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
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-euclid font-[500] text-base transition-all ${
                    isActive
                      ? "text-[--app-bg-red]"
                      : "text-gray-600 hover:text-[--app-primary-color]"
                  }`}
                >
                  {link.label}
                </Link>
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
