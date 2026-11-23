import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  CreditCard,
  Layers3,
  MessageSquareText,
  UserRound,
} from "lucide-react";

const Row = ({ label, children }) => (
  <div className="grid gap-2 border-t border-border py-3 text-sm first:border-t-0 sm:grid-cols-[150px_1fr] sm:gap-4">
    <b>{label}</b>
    <span className="break-words text-ash">{children}</span>
  </div>
);

const formatDate = (date) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const AppointmentDetails = ({ appointment, backHref, backLabel }) => {
  const { service, customer, transaction } = appointment;
  const isPaid = appointment.paymentStatus === "Paid";
  const transactionId = transaction?.transactionId || transaction?._id;
  const statusClass = {
    Pending: "bg-amber-100 text-amber-700",
    Confirmed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  }[appointment.status];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <p className="text-sm text-ash">
        <Link href={backHref} className="hover:text-charcoal">{backLabel}</Link>
        <span className="mx-2">›</span>
        <b className="text-charcoal">Appointment Details</b>
      </p>
      <h1 className="mt-4 font-heading text-3xl font-semibold">Appointment Details</h1>
      <p className="mt-1 text-sm text-ash">View complete information about this appointment.</p>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)]">
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <CalendarDays className="size-6" /> Appointment Information
            </h2>
            <div className="mt-4">
              <Row label="Appointment ID">{appointment._id}</Row>
              <Row label="Status">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                  ● {appointment.status}
                </span>
              </Row>
              <Row label="Appointment Date">{appointment.appointmentDate}</Row>
              <Row label="Appointment Time">{appointment.timeSlot}</Row>
              <Row label="Service Duration">{service.duration} minutes</Row>
              <Row label="Booking Date">{formatDate(appointment.createdAt)}</Row>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <Layers3 className="size-6" /> Service Details
            </h2>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <Image src={service.image} alt={service.serviceName} width={112} height={112} className="size-28 shrink-0 rounded-lg object-cover" />
              <div>
                <h3 className="text-lg font-semibold">{service.serviceName}</h3>
                <p className="mt-1 text-sm text-ash">{service.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-ash"><Clock3 className="size-4" />{service.duration} minutes</span>
                  <span className="rounded bg-cream px-3 py-1 text-xs">{service.category}</span>
                  <b className="font-heading text-2xl text-[#684521]">${appointment.servicePrice.toFixed(2)}</b>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <UserRound className="size-6" /> Customer Information
            </h2>
            <div className="mt-5 flex items-center gap-4">
              <Image src={customer.image} alt={customer.name} width={80} height={80} className="size-20 rounded-full object-cover" />
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold">{customer.name}</h3>
                <p className="truncate text-sm text-ash">{customer.email}</p>
                <p className="mt-2 text-sm">{customer.phone || "No phone number"}</p>
              </div>
            </div>
          </section>

          {appointment.message && (
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
                <MessageSquareText className="size-6" /> Customer Message
              </h2>
              <p className="mt-4 text-sm leading-6 text-ash">{appointment.message}</p>
            </section>
          )}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold">
              <CreditCard className="size-6" /> Payment Information
            </h2>
            <div className="mt-4">
              <Row label="Payment Status">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  ● {appointment.paymentStatus}
                </span>
              </Row>
              <Row label="Payment Method">{isPaid ? "Online Payment (Stripe)" : "Not paid yet"}</Row>
               {isPaid && (
                 <Row label="Transaction ID">
                   <span className="block break-all font-mono text-xs">
                     {transactionId || "—"}
                   </span>
                 </Row>
               )}
              <Row label="Amount">${appointment.servicePrice.toFixed(2)}</Row>
              {isPaid && <Row label="Payment Date">{formatDate(transaction.createdAt)}</Row>}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AppointmentDetails;
