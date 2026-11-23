import Link from "next/link";
import { ArrowLeft, Home, LockKeyhole, Scissors, ShieldAlert } from "lucide-react";

const UnauthorizedPage = () => (
  <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f8f4f1] px-5 py-10 text-charcoal">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-[#eadbce] blur-3xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-28 -right-28 size-96 rounded-full bg-[#e6d1be]/70 blur-3xl"
    />

    <section className="relative w-full max-w-lg rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-[0_22px_60px_-30px_rgba(76,48,25,0.4)] sm:px-10 sm:py-12">
      <Link href="/" className="inline-flex items-center gap-2 font-heading text-2xl font-semibold tracking-tight">
        <span className="grid size-9 place-items-center rounded-full bg-[#4c3019] text-white">
          <Scissors className="size-5" aria-hidden="true" />
        </span>
        SalonBook
      </Link>

      <span className="mx-auto mt-10 flex size-18 items-center justify-center rounded-full bg-[#fde8e5] text-[#bd3d32] shadow-[0_0_0_8px_rgba(189,61,50,0.08)]">
        <ShieldAlert className="size-9" aria-hidden="true" />
      </span>
      <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#684521]">
        <LockKeyhole className="size-3.5" aria-hidden="true" />
        Access restricted
      </p>
      <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">
        You don&apos;t have access
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-ash sm:text-base">
        Your account does not have permission to view this page. Please sign in
        with the correct account or return to the homepage.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold hover:bg-cream"
        >
          <Home className="size-4" aria-hidden="true" />
          Back to Home
        </Link>
        <Link
          href="/sign-in"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#4c3019] px-5 text-sm font-semibold text-white hover:bg-[#684521]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Sign In
        </Link>
      </div>
    </section>
  </main>
);

export default UnauthorizedPage;
