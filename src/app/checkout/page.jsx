import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  CreditCard,
  LockKeyhole,
  Scissors,
  ShieldCheck,
} from "lucide-react";

const getValue = (value, fallback) =>
  Array.isArray(value) ? value[0] || fallback : value || fallback;

const CheckoutPage = async ({ searchParams }) => {
  const query = await searchParams;
  const service = getValue(query.service, "Salon appointment");
  const appointmentDate = getValue(query.date, "Date will be confirmed");
  const appointmentTime = getValue(query.time, "Time will be confirmed");
  const appointmentId = getValue(query.appointmentId, "");
  const amount = Number(getValue(query.price, "0"));
  const total = Number.isFinite(amount) ? amount : 0;

  const { canceled } = query

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f4f1] text-charcoal">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-20 w-full max-w-5xl items-center px-5 sm:px-8">
          <Link
            href="/dashboard/customer/my-appointments"
            aria-label="Back to my appointments"
            className="mr-5 rounded-md p-2 text-ash transition-colors hover:bg-cream hover:text-charcoal"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-[#4c3019] text-white">
              <Scissors className="size-5" aria-hidden="true" />
            </span>
            <span className="font-heading text-2xl font-semibold tracking-tight">
              SalonBook
            </span>
          </Link>
          <span className="ml-auto hidden items-center gap-2 text-sm text-ash sm:flex">
            <ShieldCheck className="size-4 text-[#684521]" aria-hidden="true" />
            Secure checkout
          </span>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:py-16">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ash">
            Order summary
          </p>
          <div className="mt-5 rounded-xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <h1 className="font-heading text-2xl font-semibold text-charcoal">
                  {service}
                </h1>
                <p className="mt-1 text-sm text-ash">Salon appointment payment</p>
              </div>
              <p className="whitespace-nowrap text-xl font-semibold text-charcoal">
                ${total.toFixed(2)}
              </p>
            </div>

            <div className="space-y-3 py-5 text-sm text-ash">
              <p className="flex items-center gap-3">
                <CalendarDays className="size-4 text-[#684521]" aria-hidden="true" />
                {appointmentDate}
              </p>
              <p className="flex items-center gap-3">
                <Clock3 className="size-4 text-[#684521]" aria-hidden="true" />
                {appointmentTime}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-5 text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ash">
            Payment method
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 border-b border-border bg-cream/60 px-5 py-4">
              <span className="grid size-9 place-items-center rounded-md bg-white text-[#684521] shadow-sm">
                <CreditCard className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">Card payment</p>
                <p className="text-xs text-ash">Securely processed by Stripe</p>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="min-h-20 text-sm leading-6 text-ash">
                You&apos;ll be redirected to Stripe&apos;s secure checkout to complete
                your payment. SalonBook does not store your card details.
              </p>
              <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="appointmentId" value={appointmentId} />
                <input type="hidden" name="service" value={service} />
                <input type="hidden" name="price" value={total} />
                <button
                  type="submit"
                  className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#4c3019] px-5 text-base font-semibold text-white transition-colors hover:bg-[#684521]"
                >
                  Pay ${total.toFixed(2)}
                </button>
              </form>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ash">
                <LockKeyhole className="size-3.5" aria-hidden="true" />
                Powered by Stripe
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CheckoutPage;
