export const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { href: "/about-us", label: "Our Story" },
      { href: "/about-us/inside-ysfon", label: "Inside YSFON" },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/store", label: "Store" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { href: "/resources/news", label: "Blog" },
      { href: "/resources/training", label: "Training" },
      { href: "/resources/contest", label: "Competition" },
    ],
  },
  { href: "/subscription", label: "Membership" },
  { href: "/contact-us", label: "Contact Us" },
];
