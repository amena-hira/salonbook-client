import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  CreditCard,
  Layers3,
  Settings2,
  UserRound,
} from "lucide-react";

const Row = ({ label, children }) => (
  <div className="grid grid-cols-[minmax(140px,1fr)_minmax(180px,1.15fr)] gap-4 border-t border-border px-3 py-3 text-sm first:border-t-0">
    <b>{label}</b>
    <span>{children}</span>
  </div>
);

const AppointmentDetailsPage = async ({ params }) => {
  const { id } = await params;
  const appointment = {
    id,
    status: "Confirmed",
    date: "Nov 24, 2026",
    time: "11:30 AM",
    duration: 75,
    bookingDate: "Nov 22, 2026 at 4:15 PM",
    customer: "Sara Ahmed",
    email: "sara@example.com",
    phone: "+880 1712-345678",
    service: "Deep Facial Treatment",
    category: "Facial & Skincare",
    description:
      "Skin cleansing and rejuvenation with premium facial care products.",
    price: 85,
    payment: "Paid",
    paymentMethod: "Online Payment (Stripe)",
    transaction: "txn_9Xy3kPz8mQ",
    paymentDate: "Nov 22, 2026 at 4:16 PM",
  };
  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <p className="text-sm text-ash">
        <Link href="/dashboard/admin/appointments">Manage Appointments</Link>
        <span className="mx-2">›</span>
        <b className="text-charcoal">Appointment Details</b>
      </p>
      <h1 className="mt-4 font-heading text-3xl font-semibold">
        Appointment Details
      </h1>
      <p className="mt-1 text-sm text-ash">
        View complete information about this appointment.
      </p>
      <Link
        href="/dashboard/admin/appointments"
        className="mt-5 inline-flex rounded-lg border border-border px-4 py-2.5 text-sm font-semibold"
      >
        ‹ Back to Appointments
      </Link>
      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.9fr)]">
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <CalendarDays className="size-6" />
              Appointment Information
            </h2>
            <div className="mt-4">
              <Row label="Appointment ID">{appointment.id}</Row>
              <Row label="Status">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  ● Confirmed
                </span>
              </Row>
              <Row label="Appointment Date">{appointment.date}</Row>
              <Row label="Appointment Time">{appointment.time}</Row>
              <Row label="Service Duration">{appointment.duration} minutes</Row>
              <Row label="Booking Date">{appointment.bookingDate}</Row>
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <Layers3 className="size-6" />
              Service Details
            </h2>
            <div className="mt-5 flex gap-4">
              <Image
                src="/images/services/facial.jpg"
                alt={appointment.service}
                width={112}
                height={112}
                className="size-28 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{appointment.service}</h3>
                <p className="mt-1 text-sm text-ash">
                  {appointment.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-ash">
                    <Clock3 className="size-4" />
                    {appointment.duration} minutes
                  </span>
                  <span className="rounded bg-cream px-3 py-1 text-xs">
                    {appointment.category}
                  </span>
                  <b className="font-heading text-2xl text-[#684521]">
                    ${appointment.price.toFixed(2)}
                  </b>
                </div>
              </div>
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <CreditCard className="size-6" />
              Payment Information
            </h2>
            <div className="mt-4">
              <Row label="Payment Status">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  ● {appointment.payment}
                </span>
              </Row>
              <Row label="Payment Method">{appointment.paymentMethod}</Row>
              <Row label="Transaction ID">{appointment.transaction}</Row>
              <Row label="Amount Paid">${appointment.price.toFixed(2)}</Row>
              <Row label="Payment Date">{appointment.paymentDate}</Row>
            </div>
          </section>
        </div>
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <UserRound className="size-6" />
              Customer Information
            </h2>
            <div className="mt-5 flex items-center gap-4">
              <Image
                src="/images/services/hair-cut.jpg"
                alt="Customer"
                width={80}
                height={80}
                className="size-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {appointment.customer}
                </h3>
                <p className="text-sm text-ash">{appointment.email}</p>
                <p className="mt-2 text-sm">{appointment.phone}</p>
              </div>
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <Settings2 className="size-6" />
              Appointment Actions
            </h2>
            <div className="mt-5 space-y-3">
              <button className="w-full rounded-lg bg-[#3c2a1d] py-3 text-sm font-semibold text-white">
                Confirm Appointment
              </button>
              <button className="w-full rounded-lg border border-[#684521] py-3 text-sm font-semibold text-[#684521]">
                Reschedule
              </button>
              <button className="w-full rounded-lg border border-red-300 py-3 text-sm font-semibold text-destructive">
                Cancel Appointment
              </button>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AppointmentDetailsPage;
