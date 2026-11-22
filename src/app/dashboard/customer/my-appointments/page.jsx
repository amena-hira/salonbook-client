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

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-border bg-cream/40 text-xs text-ash">
            <tr><th className="px-5 py-3 font-medium">Service</th><th className="px-4 py-3 font-medium">Date &amp; Time</th><th className="px-4 py-3 font-medium">Status</th><th className="px-5 py-3 text-right font-medium">Actions</th></tr>
          </thead>
          <tbody>
            {visibleAppointments.map((appointment) => (
              <tr key={appointment.title} className="border-b border-border last:border-0">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><Image src={appointment.image} alt={appointment.title} width={64} height={64} className="size-16 rounded-lg object-cover" /><div><h3 className="text-sm font-semibold text-charcoal">{appointment.title}</h3><span className="mt-1 inline-block rounded bg-cream px-2 py-0.5 text-xs text-charcoal">{appointment.category}</span></div></div></td>
                <td className="px-4 py-4 text-xs text-ash"><p className="flex items-center gap-1.5"><CalendarDays className="size-3.5" aria-hidden="true" />{appointment.date}</p><p className="mt-1 flex items-center gap-1.5"><Clock3 className="size-3.5" aria-hidden="true" />{appointment.time}</p></td>
                <td className="px-4 py-4"><span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}>{appointment.status}</span></td>
                <td className="px-5 py-4"><div className="flex justify-end gap-2">{appointment.status === "Confirmed" && <button type="button" onClick={() => toast.add({ title: "Payment", description: "Payment is not available yet.", type: "info" })} className="inline-flex items-center gap-1.5 rounded-md bg-[#3c2a1d] px-3 py-2 text-xs font-semibold text-white"><CreditCard className="size-3.5" aria-hidden="true" />Pay Now</button>}{appointment.status === "Pending" && <button type="button" onClick={() => toast.add({ title: "Appointment cancelled", description: `${appointment.title} has been cancelled.`, type: "success" })} className="inline-flex items-center gap-1.5 rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-destructive"><CircleX className="size-3.5" aria-hidden="true" />Cancel</button>}<button type="button" onClick={() => showDetails(appointment.title)} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-charcoal"><Eye className="size-3.5" aria-hidden="true" />Details</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyAppointmentsPage;
