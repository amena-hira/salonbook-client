import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowRight,
  Check,
  ReceiptText,
  Scissors,
  ShieldCheck,
} from "lucide-react";
import { stripe } from "@/lib/stripe";
import { verifyCheckoutPayment } from "@/lib/actions/payments";

const getValue = (value, fallback) =>
  Array.isArray(value) ? value[0] || fallback : value || fallback;

const CheckoutSuccessPage = async ({ searchParams }) => {
  const query = await searchParams;
  const sessionId = getValue(query.session_id, "");

  if (!sessionId) notFound();

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.status === "open") redirect("/");
  if (session.status !== "complete" || session.payment_status !== "paid") {
    redirect("/checkout/cancel");
  }

  const paymentIntent =
    typeof session.payment_intent === "object" ? session.payment_intent : null;
  const transactionId = paymentIntent?.id;
  if (!transactionId) redirect("/checkout/cancel");

  try {
    await verifyCheckoutPayment(sessionId);
  } catch {
    redirect("/checkout/cancel");
  }

  const lineItems = session.line_items?.data || [];
  const service =
    session.metadata?.service ||
    lineItems[0]?.description ||
    getValue(query.service, "Salon appointment");
  const appointmentId = getValue(query.appointmentId, "—");
  const amount = ((session.amount_total || 0) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: session.currency || "usd",
  });
  const paymentDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(session.created * 1000));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f4f1] text-charcoal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e4cfbd]/60 blur-[110px]"
      />

      <header className="relative mx-auto flex h-15 w-full max-w-3xl items-center px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-[#4c3019] text-white">
            <Scissors className="size-5" aria-hidden="true" />
          </span>
          <span className="font-heading text-2xl font-semibold tracking-tight">
            SalonBook
          </span>
        </Link>
      </header>

      <section className="relative mx-auto flex w-full max-w-xl justify-center px-5 pb-16 pt-8 sm:px-8 sm:pt-14">
        <div className="w-full rounded-3xl border border-border bg-card px-5 py-8 text-center shadow-[0_22px_60px_-30px_rgba(76,48,25,0.35)] sm:px-10 sm:py-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#338144] text-white shadow-[0_0_0_7px_rgba(51,129,68,0.10)]">
            <Check strokeWidth={3} className="size-8" aria-hidden="true" />
          </span>

          <p className="mt-7 inline-flex rounded border border-[#78a984] bg-[#eaf6ec] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#277338]">
            Payment successful
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold text-charcoal">
            Your appointment is paid
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-ash sm:text-base">
            We received your payment of {amount} for {service}. Your
            appointment details are available in My Appointments.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-[#fcfaf8] p-4 text-left sm:p-5">
            <div className="flex items-center gap-2.5 border-b border-border pb-3.5">
              <ReceiptText className="size-5 text-[#684521]" aria-hidden="true" />
              <span className="text-sm font-semibold">Payment receipt</span>
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-[#277338]">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Verified
              </span>
            </div>

            <dl className="divide-y divide-border text-sm">
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-ash">Appointment ID</dt>
                <dd className="max-w-48 truncate font-mono text-xs text-charcoal" title={appointmentId}>
                  {appointmentId}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-ash">Service</dt>
                <dd className="max-w-48 truncate font-medium text-charcoal">{service}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-ash">Amount paid</dt>
                <dd className="font-semibold text-charcoal">{amount}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-ash">Payment date</dt>
                <dd className="text-charcoal">{paymentDate}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 pt-3">
                <dt className="text-ash">Transaction ID</dt>
                <dd className="max-w-48 truncate font-mono text-xs text-charcoal" title={transactionId}>
                  {transactionId}
                </dd>
              </div>
            </dl>
          </div>

          <Link
            href="/dashboard/customer/my-appointments"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4c3019] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#684521]"
          >
            Go to My Appointments
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CheckoutSuccessPage;
