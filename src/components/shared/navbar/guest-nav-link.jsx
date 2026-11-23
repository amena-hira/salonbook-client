"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const GuestNavLink = ({ href, className, children }) => {
  const { data: session } = useSession();

  if (session?.user) return null;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default GuestNavLink;
