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
    <section className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10">
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
            <Link href="/dashboard/customer/appointments" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-ash">View All <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <div className="px-6">
            {appointments.map((appointment, index) => (
              <article key={appointment.title} className={`flex flex-col gap-4 py-5 sm:flex-row sm:items-center ${index < appointments.length - 1 ? "border-b border-border" : ""}`}>
                <Image src={appointment.image} alt={appointment.title} width={138} height={112} className="h-28 w-36 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg font-semibold text-charcoal">{appointment.title}</h4>
                  <span className="mt-2 inline-block rounded-md bg-cream px-3 py-1 text-xs font-medium text-charcoal">{appointment.category}</span>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ash sm:text-sm">
                    <span className="flex items-center gap-2"><CalendarDays className="size-4" aria-hidden="true" />{appointment.date}</span>
                    <span className="flex items-center gap-2"><Clock3 className="size-4" aria-hidden="true" />{appointment.time}</span>
                  </div>
                </div>
                <span className={`self-start rounded-full px-4 py-2 text-xs font-semibold sm:self-center ${statusStyles[appointment.status]}`}>{appointment.status}</span>
              </article>
            ))}
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
