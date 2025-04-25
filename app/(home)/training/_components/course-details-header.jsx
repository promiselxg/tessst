"use client";

import HamburgerMenu from "@/components/navbar/hamburgerMenu";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CourseHeaderUserAvatar from "./course-details-header-avatar";

import MobileMenu from "@/components/navbar/mobileMenu";

const CourseDetailsHeader = ({ courseId, links }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <nav className="w-full px-4 py-3 flex items-center justify-between shadow bg-white left-0 z-50 h-[85px] sticky top-0">
        <div className="container w-[1300px] mx-auto flex items-center justify-between gap-10">
          <div className="w-1/5">
            <Link href="/" className="w-fit cursor-default">
              <Image
                src="/img/ysfon-logo.png"
                alt="ysfon-logo"
                width={80}
                height={80}
                className="cursor-pointer"
                priority
              />
            </Link>
          </div>
          <div className="w-[60%] ">
            <div className="flex items-center gap-5 md:gap-10 md:flex-1 justify-between">
              <Input className="hidden md:flex" />
            </div>
          </div>
          <div className="w-1/5 justify-end flex items-center gap-5 md:gap-0">
            <CourseHeaderUserAvatar />
            <div className="md:hidden">
              <HamburgerMenu isOpen={isOpen} toggle={toggleMenu} />
            </div>
          </div>
        </div>

        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          navLinks={links}
          courseId={courseId}
          courseLinks={true}
        />
      </nav>
    </>
  );
};

export default CourseDetailsHeader;
