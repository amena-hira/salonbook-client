"use client"
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, CircleX, Clock3 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const appointments = [
  { title: "Classic Haircut & Styling", category: "Haircut & Styling", date: "Tue, Nov 25, 2026", time: "2:00 PM (60 mins)", status: "Confirmed", image: "/images/services/hair-cut.jpg" },
  { title: "Hair Color & Treatment", category: "Hair Color", date: "Mon, Nov 18, 2026", time: "4:00 PM (90 mins)", status: "Pending", image: "/images/services/hair-color.jpg" },
  { title: "Beard Trimming", category: "Grooming", date: "Wed, Nov 5, 2026", time: "11:00 AM (30 mins)", status: "Cancelled", image: "/images/services/man-hair-cut.jpg" },
];

const statusStyles = {
  Confirmed: "bg-[#e7f6e7] text-[#258235]",
  Pending: "bg-[#fff2d6] text-[#9a6816]",
  Cancelled: "bg-[#fde8e5] text-[#bd3d32]",
};

const summaryCards = [
  { label: "Total Appointments", value: "12", icon: CalendarDays, className: "bg-[#fde9e5] text-[#dd795d]" },
  { label: "Pending", value: "2", icon: Clock3, className: "bg-[#fff3d9] text-[#d4941c]" },
  { label: "Confirmed", value: "7", icon: Check, className: "bg-[#e7f6e7] text-[#2d9441]" },
  { label: "Cancelled", value: "3", icon: CircleX, className: "bg-[#fde8e5] text-[#df765f]" },
];

const CustomerDashboardPage = () => {
  const {data:session} = useSession();
  const user = session?.user

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-6 sm:px-10">
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">Welcome back, {user?.name || "there"}! </h2>
        <p className="mt-2 text-base text-ash">Here&apos;s a quick overview of your salon appointments.</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(({ label, value, icon: Icon, className }) => (
          <article key={label} className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5">
            <span className={`grid size-10 place-items-center rounded-full ${className}`}>
              <Icon className="size-6" strokeWidth={0.8} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-charcoal">{label}</p>
              <p className="mt-1 font-heading text-3xl font-semibold text-charcoal">{value}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-7 xl:grid-cols-[minmax(0,1.75fr)_minmax(300px,0.95fr)]">
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <h3 className="flex items-center gap-3 font-heading text-2xl font-semibold text-charcoal"><CalendarDays className="size-6" aria-hidden="true" />Recent Appointments</h3>
            <Link href="/dashboard/customer/my-appointments" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-ash">View All <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.title} className="border-b border-border last:border-0">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><Image src={appointment.image} alt={appointment.title} width={56} height={56} className="size-14 rounded-lg object-cover" /><div><h4 className="text-sm font-semibold text-charcoal">{appointment.title}</h4><span className="mt-1 inline-block rounded bg-cream px-2 py-0.5 text-xs text-charcoal">{appointment.category}</span></div></div></td>
                    <td className="px-4 py-4 text-xs text-ash"><p className="flex items-center gap-1.5"><CalendarDays className="size-3.5" aria-hidden="true" />{appointment.date}</p><p className="mt-1 flex items-center gap-1.5"><Clock3 className="size-3.5" aria-hidden="true" />{appointment.time}</p></td>
                    <td className="px-6 py-4 text-right"><span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}>{appointment.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="relative min-h-96 overflow-hidden rounded-2xl bg-charcoal p-8 text-white">
          <Image src="/images/hero.jpg" alt="Salon interior" fill sizes="(min-width: 1280px) 32vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="relative flex h-full min-h-80 flex-col justify-end">
            <h3 className="max-w-sm font-heading text-3xl font-semibold leading-none">Book Your Next Appointment</h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">Explore our salon services and schedule your beauty &amp; grooming session today.</p>
            <Link href="/services" className="mt-5 inline-flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-cream">Browse Services <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CustomerDashboardPage;
