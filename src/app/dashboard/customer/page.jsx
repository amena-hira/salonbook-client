import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Check, CircleX, Clock3 } from "lucide-react";
import { auth } from "@/lib/auth";
import { getMyAppointments } from "@/lib/api/appointments";

const statusStyles = {
  Confirmed: "bg-[#e7f6e7] text-[#258235]",
  Pending: "bg-[#fff2d6] text-[#9a6816]",
  Cancelled: "bg-[#fde8e5] text-[#bd3d32]",
};

const CustomerDashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in?redirectTo=/dashboard/customer");

  let appointments = [];
  try {
    const result = await getMyAppointments(session.user.id);
    const items = Array.isArray(result)
      ? result
      : result.appointments || result.data || [];
    appointments = items.map((appointment) => ({
      id: appointment._id,
      title: appointment.service.serviceName,
      category: appointment.service.category,
      date: appointment.appointmentDate,
      time: `${appointment.timeSlot} (${appointment.service.duration} mins)`,
      status: appointment.status,
      image: appointment.service.image,
      createdAt: appointment.createdAt,
    }));
  } catch {
    appointments = [];
  }

  const summaryCards = [
    [
      "Total Appointments",
      appointments.length,
      CalendarDays,
      "bg-[#fde9e5] text-[#dd795d]",
    ],
    [
      "Pending",
      appointments.filter((item) => item.status === "Pending").length,
      Clock3,
      "bg-[#fff3d9] text-[#d4941c]",
    ],
    [
      "Confirmed",
      appointments.filter((item) => item.status === "Confirmed").length,
      Check,
      "bg-[#e7f6e7] text-[#2d9441]",
    ],
    [
      "Cancelled",
      appointments.filter((item) => item.status === "Cancelled").length,
      CircleX,
      "bg-[#fde8e5] text-[#df765f]",
    ],
  ];
  const recentAppointments = [...appointments]
    .sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
    )
    .slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-6 sm:px-10">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
          Welcome back, {session.user.name || "there"}!
        </h1>
        <p className="mt-2 text-base text-ash">
          Here&apos;s a quick overview of your salon appointments.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(([label, value, Icon, className]) => (
          <article
            key={label}
            className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5"
          >
            <span
              className={`grid size-10 place-items-center rounded-full ${className}`}
            >
              <Icon className="size-6" strokeWidth={0.8} />
            </span>
            <div>
              <p className="text-sm font-semibold text-charcoal">{label}</p>
              <p className="mt-1 font-heading text-3xl font-semibold text-charcoal">
                {value}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 grid gap-7 xl:grid-cols-[minmax(0,1.75fr)_minmax(300px,0.95fr)]">
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold text-charcoal">
              <CalendarDays className="size-6" />
              Recent Appointments
            </h2>
            <Link
              href="/dashboard/customer/my-appointments"
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-ash"
            >
              View All <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {appointment.image && (
                          <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                            <Image src={appointment.image} alt="" fill sizes="56px" className="object-cover" />
                          </span>
                        )}
                        <div>
                          <h3 className="text-sm font-semibold text-charcoal">
                            {appointment.title}
                          </h3>
                          <span className="mt-1 inline-block rounded bg-cream px-2 py-0.5 text-xs text-charcoal">
                            {appointment.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-ash">
                      <p className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        {appointment.date}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5">
                        <Clock3 className="size-3.5" />
                        {appointment.time}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status] || statusStyles.Pending}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentAppointments.length === 0 && (
              <p className="px-6 py-10 text-center text-sm text-ash">
                No appointments yet.
              </p>
            )}
          </div>
        </section>
        <section className="relative min-h-96 overflow-hidden rounded-2xl bg-charcoal p-8 text-white">
          <Image src="/images/hero.jpg" alt="Salon interior" fill sizes="(min-width: 1280px) 32vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="relative flex h-full min-h-80 flex-col justify-end">
            <h2 className="max-w-sm font-heading text-3xl font-semibold leading-none">
              Book Your Next Appointment
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
              Explore our salon services and schedule your beauty &amp; grooming
              session today.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-cream"
            >
              Browse Services <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CustomerDashboardPage;
