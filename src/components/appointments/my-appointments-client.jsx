"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { CalendarDays, CircleX, Clock3, CreditCard, DollarSign, Eye } from "lucide-react";
import { toast } from "@/components/ui/toast";

const toTitleCase = (value) =>
  value
    ? `${value}`.charAt(0).toUpperCase() + `${value}`.slice(1).toLowerCase()
    : "Pending";

const normalizeAppointment = (appointment) => {
  const service = appointment.service || appointment.serviceId || {};
  const duration = service.duration || appointment.duration;
  const time = appointment.timeSlot || appointment.time || "Time pending";

  return {
    id: appointment._id || appointment.id,
    title:
      service.serviceName ||
      service.name ||
      appointment.serviceName ||
      "Salon service",
    category: service.category || appointment.category || "Service",
    date: appointment.appointmentDate || appointment.date || "Date pending",
    time: duration ? `${time} (${duration} mins)` : time,
    price: service.price,
    createdAt: appointment.createdAt,
    status: toTitleCase(appointment.status || appointment.appointmentStatus),
    image: service.image || appointment.image,
  };
};

const statusStyles = {
  Confirmed: "bg-[#e7f6e7] text-[#258235]",
  Pending: "bg-[#fff2d6] text-[#9a6816]",
  Cancelled: "bg-[#fde8e5] text-[#bd3d32]",
};

const MyAppointmentsClient = ({ initialAppointments }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const appointments = initialAppointments.map(normalizeAppointment);
  const filters = ["All", "Pending", "Confirmed", "Cancelled"].map((label) => ({
    label,
    count:
      label === "All"
        ? appointments.length
        : appointments.filter((appointment) => appointment.status === label)
          .length,
  }));
  const visibleAppointments =
    activeFilter === "All"
      ? appointments
      : appointments.filter(
        (appointment) => appointment.status === activeFilter,
      );

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
          My Appointments
        </h1>
        <p className="mt-2 text-base text-ash">
          View and manage all your salon appointments.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => setActiveFilter(filter.label)}
            className={`h-10 min-w-28 rounded-full border px-4 text-sm font-semibold transition-colors ${activeFilter === filter.label ? "border-charcoal bg-[#3c2a1d] text-white" : "border-border bg-card text-charcoal hover:bg-cream"}`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-border bg-cream/40 text-xs text-ash">
            <tr>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Date &amp; Time</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Request Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="size-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                      <img
                        src={appointment.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    </span>
                    <div>
                      <h2 className="text-sm font-semibold text-charcoal">
                        {appointment.title}
                      </h2>
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
                <td className="px-4 py-4 text-xs text-ash">
                  <p className="flex items-center gap-0.3">
                    <DollarSign className="size-3.5" />
                    {appointment.price}
                  </p>
                </td>
                <td className="px-4 py-4 text-xs text-ash">
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {new Date(appointment.createdAt).toISOString().split("T")[0]}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status] || statusStyles.Pending}`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    {appointment.status === "Confirmed" && (
                      <button
                        type="button"
                        onClick={() =>
                          toast.add({
                            title: "Payment",
                            description: "Payment is not available yet.",
                            type: "info",
                          })
                        }
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#3c2a1d] px-3 py-2 text-xs font-semibold text-white"
                      >
                        <CreditCard className="size-3.5" />
                        Pay Now
                      </button>
                    )}
                    {appointment.status === "Pending" && (
                      <button
                        type="button"
                        onClick={() =>
                          toast.add({
                            title: "Appointment cancellation",
                            description:
                              "Cancellation will be available when the appointments API is connected.",
                            type: "info",
                          })
                        }
                        className="inline-flex items-center gap-1.5 rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-destructive"
                      >
                        <CircleX className="size-3.5" />
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        toast.add({
                          title: appointment.title,
                          description:
                            "Appointment details will be available here.",
                          type: "info",
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-charcoal"
                    >
                      <Eye className="size-3.5" />
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleAppointments.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-ash">
            No appointments found.
          </p>
        )}
      </div>
    </section>
  );
};

export default MyAppointmentsClient;
