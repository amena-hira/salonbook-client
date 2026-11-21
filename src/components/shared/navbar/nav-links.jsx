"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const NavLinks = ({ mobile = false }) => {
  const pathname = usePathname();

  return navigation.map((item) => {
    const isActive = pathname === item.href;
    const desktopClasses = isActive
      ? "text-cream after:w-full"
      : "text-white/90 after:w-0 hover:text-white hover:after:w-full";
    const mobileClasses = isActive
      ? "bg-white/15 text-cream"
      : "text-white hover:bg-white/10";

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={
          mobile
            ? `block w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors ${mobileClasses}`
            : `relative py-2 text-base font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-cream after:transition-[width] after:duration-300 ${desktopClasses}`
        }
      >
        {item.label}
      </Link>
    );
  });
};

export default NavLinks;
