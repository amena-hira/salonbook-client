"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, CircleX, Clock3, CreditCard, Eye } from "lucide-react";
import { toast } from "@/components/ui/toast";

const appointments = [
  { title: "Classic Haircut & Styling", category: "Haircut & Styling", date: "Tue, Nov 25, 2026", time: "2:00 PM (60 mins)", status: "Confirmed", image: "/images/services/hair-cut.jpg" },
  { title: "Hair Color & Treatment", category: "Hair Color", date: "Mon, Nov 18, 2026", time: "4:00 PM (90 mins)", status: "Pending", image: "/images/services/hair-color.jpg" },
  { title: "Beard Trimming", category: "Grooming", date: "Wed, Nov 5, 2026", time: "11:00 AM (30 mins)", status: "Cancelled", image: "/images/services/man-hair-cut.jpg" },
];

const filters = [
  { label: "All", count: 12 },
  { label: "Pending", count: 2 },
  { label: "Confirmed", count: 7 },
  { label: "Cancelled", count: 3 },
];

const statusStyles = {
  Confirmed: "bg-[#e7f6e7] text-[#258235]",
  Pending: "bg-[#fff2d6] text-[#9a6816]",
  Cancelled: "bg-[#fde8e5] text-[#bd3d32]",
};

const MyAppointmentsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleAppointments = activeFilter === "All"
    ? appointments
    : appointments.filter((appointment) => appointment.status === activeFilter);

  const showDetails = (title) => {
    toast.add({ title, description: "Appointment details will be available here.", type: "info" });
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10">
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">My Appointments</h2>
        <p className="mt-2 text-base text-ash">View and manage all your salon appointments.</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-5">
        {filters.map((filter) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => setActiveFilter(filter.label)}
            className={`h-12 min-w-36 rounded-full border px-5 text-sm font-semibold transition-colors ${activeFilter === filter.label ? "border-charcoal bg-[#3c2a1d] text-white" : "border-border bg-card text-charcoal hover:bg-cream"}`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-4">
        {visibleAppointments.map((appointment) => (
          <article key={appointment.title} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 xl:min-h-48 xl:flex-row xl:items-center xl:gap-7">
            <Image src={appointment.image} alt={appointment.title} width={160} height={144} className="h-36 w-40 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-charcoal sm:text-xl">{appointment.title}</h3>
              <span className="mt-2 inline-block rounded-md bg-cream px-3 py-1 text-xs font-medium text-charcoal">{appointment.category}</span>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ash">
                <span className="flex items-center gap-2"><CalendarDays className="size-4" aria-hidden="true" />{appointment.date}</span>
                <span className="flex items-center gap-2"><Clock3 className="size-4" aria-hidden="true" />{appointment.time}</span>
              </div>
            </div>
            <div className="xl:w-40 xl:shrink-0 xl:text-center">
              <span className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[appointment.status]}`}>{appointment.status}</span>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3 border-border pt-5 xl:border-t-0 xl:border-l xl:pl-7 xl:pt-0">
                {appointment.status === "Confirmed" && (
                  <button type="button" onClick={() => toast.add({ title: "Payment", description: "Payment is not available yet.", type: "info" })} className="inline-flex items-center gap-2 rounded-lg bg-[#3c2a1d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-charcoal"><CreditCard className="size-4" aria-hidden="true" />Pay Now</button>
                )}
                {appointment.status === "Pending" && (
                  <button type="button" onClick={() => toast.add({ title: "Appointment cancelled", description: `${appointment.title} has been cancelled.`, type: "success" })} className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10"><CircleX className="size-4" aria-hidden="true" />Cancel Appointment</button>
                )}
                <button type="button" onClick={() => showDetails(appointment.title)} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-charcoal hover:bg-cream"><Eye className="size-4" aria-hidden="true" />View Details</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MyAppointmentsPage;
