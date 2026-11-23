import Link from "next/link";
import { ArrowLeft, CircleX, Scissors } from "lucide-react";

const getValue = (value, fallback) =>
  Array.isArray(value) ? value[0] || fallback : value || fallback;

const CheckoutCancelPage = async ({ searchParams }) => {
  const query = await searchParams;
  const service = getValue(query.service, "your salon appointment");
  const appointmentId = getValue(query.appointmentId, "");
  const price = getValue(query.price, "");
  const checkoutHref = appointmentId
    ? `/checkout?appointmentId=${appointmentId}&service=${encodeURIComponent(service)}&price=${price}`
    : "/dashboard/customer/my-appointments";

  return (
    <main className="min-h-screen bg-[#f8f4f1] text-charcoal">
      <header className="mx-auto flex h-20 w-full max-w-3xl items-center px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-[#4c3019] text-white">
            <Scissors className="size-5" />
          </span>
          <span className="font-heading text-2xl font-semibold tracking-tight">
            SalonBook
          </span>
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-xl justify-center px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
        <div className="w-full rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-[0_22px_60px_-30px_rgba(76,48,25,0.35)] sm:px-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <CircleX className="size-8" />
          </span>
          <p className="mt-7 inline-flex rounded border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">
            Payment cancelled
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold">
            Your payment was not completed
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-ash sm:text-base">
            No payment was taken for {service}. You can try again whenever
            you&apos;re ready.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/customer/my-appointments"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold hover:bg-cream"
            >
              <ArrowLeft className="size-4" /> My Appointments
            </Link>
            {appointmentId && (
              <Link
                href={checkoutHref}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#4c3019] px-5 text-sm font-semibold text-white hover:bg-[#684521]"
              >
                Try Payment Again
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutCancelPage;
