import Link from "next/link";
import { Bell, Menu, Scissors } from "lucide-react";
import UserMenu from "@/components/shared/user-menu";

const user = true;

const navigation = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MobileNavigation = () => (
  <details className="group relative lg:hidden">
    <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream [&::-webkit-details-marker]:hidden">
      <Menu className="size-6 group-open:hidden" aria-hidden="true" />
      <span className="hidden text-2xl leading-none group-open:block" aria-hidden="true">
        ×
      </span>
      <span className="sr-only">Toggle navigation menu</span>
    </summary>
    <nav
      aria-label="Mobile navigation"
      className="absolute right-0 top-[calc(100%+18px)] w-72 rounded-xl border border-white/10 bg-charcoal p-4 shadow-xl"
    >
      <div className="mb-3 border-b border-white/15 pb-3 sm:hidden">
        {user && (
          <>
            <p className="font-semibold text-white">Sarah Ahmed</p>
            <p className="text-sm text-white/65">sarah.ahmed@example.com</p>
          </>
        )}
      </div>
      <div className="flex flex-col">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  </details>
);

const Navbar = () => (
  <header className="fixed inset-x-0 top-0 z-40 h-20 bg-[#1c1c1c] text-white shadow-sm">
    <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-8 lg:px-12">
      <Link href="/" className="flex shrink-0 items-center gap-2 text-white sm:gap-3">
        <span className="grid size-8 place-items-center rounded-full border border-cream/70 text-cream sm:size-9">
          <Scissors className="size-4 sm:size-5" aria-hidden="true" />
        </span>
        <span className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          SalonBook
        </span>
      </Link>

      <nav aria-label="Main navigation" className="hidden items-center gap-8 xl:gap-12 lg:flex">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-b-2 border-transparent py-2 text-base font-medium text-white/90 transition-colors hover:border-cream hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-1 sm:gap-5">
        {user ? (
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            >
              <Bell className="size-6" />
              <span className="absolute right-1 top-1 size-2.5 rounded-full bg-red-500 ring-2 ring-charcoal" />
            </button>
            <UserMenu />
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="hidden rounded-md border border-white/50 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 sm:block"
          >
            Sign In
          </Link>
        )}
        <Link
          href="/book-appointment"
          className="rounded-md bg-cream px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-charcoal transition-colors hover:bg-white sm:px-6 sm:py-3"
        >
          <span className="sm:hidden">Book</span>
          <span className="hidden sm:inline">Book Appointment</span>
        </Link>
        <MobileNavigation />
      </div>
    </div>
  </header>
);

export default Navbar;
