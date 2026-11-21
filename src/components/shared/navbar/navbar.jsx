import Link from "next/link";
import { Bell, Menu, Scissors } from "lucide-react";
import NavLinks from "@/components/shared/navbar/nav-links";
import UserMenu from "@/components/shared/navbar/user-menu";

const user = false;

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
      className="absolute right-0 top-[calc(100%+18px)] w-72 rounded-xl border border-white/10 bg-charcoal p-3 shadow-xl"
    >
      <div className="flex flex-col items-stretch gap-1">
        <NavLinks mobile />
      </div>
      <Link
        href="/book-appointment"
        className="mt-3 block w-full rounded-md bg-cream px-4 py-3 text-center text-sm font-semibold text-charcoal transition-colors hover:bg-white"
      >
        Book Appointment
      </Link>
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
        <NavLinks />
      </nav>

      <div className="flex items-center gap-1 sm:gap-5">
        {user ? (
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="relative hidden size-10 place-items-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:grid"
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
          className="hidden rounded-md bg-cream px-6 py-3 text-sm font-semibold whitespace-nowrap text-charcoal transition-colors hover:bg-white lg:block"
        >
          Book Appointment
        </Link>
        <MobileNavigation />
      </div>
    </div>
  </header>
);

export default Navbar;
