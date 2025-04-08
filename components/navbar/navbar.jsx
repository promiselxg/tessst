"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import { Button } from "../ui/button";
import HamburgerMenu from "./hamburgerMenu";
import MobileMenu from "./mobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/Projects", label: "Projects" },
  { href: "/about", label: "Store" },
  { href: "/about", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full px-4 py-3 flex items-center justify-between  bg-white fixed top-0 left-0 z-50 h-[85px]">
      <div className="container w-[1300px] mx-auto flex items-center justify-between">
        <div className="md:w-1/3">
          <Link href="/" className="w-fit cursor-default">
            <Image
              src="/img/ysfon-logo.png"
              alt="ysfon-logo"
              width={80}
              height={80}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex items-center gap-5 md:gap-10 md:flex-1 justify-between">
          <div className="hidden md:flex gap-6 ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className=" font-euclid font-[500] text-[--app-primary-color] text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5 md:gap-10">
            <Link href="/">
              <MdShoppingCart className="h-7 w-7" />
            </Link>
            <Button className="md:px-10 md:h-10 rounded-[8px] bg-[--app-primary-color] text-white transition-all">
              Donate
            </Button>
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
