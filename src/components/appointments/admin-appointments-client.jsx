"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Search,
  X,
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { updateAppointment } from "@/lib/api/appointments";

const normalizeAppointment = (appointment) => ({
  id: appointment._id,
  customer: appointment.customer.name,
  email: appointment.customerEmail,
  service: appointment.service.serviceName,
  price: appointment.servicePrice,
  category: appointment.service.category,
  date: appointment.appointmentDate,
  time: appointment.timeSlot,
  duration: appointment.service.duration,
  status: appointment.status,
  payment: appointment.paymentStatus,
  image: appointment.service.image,
  createdAt: appointment.createdAt,
});

const tone = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-red-100 text-red-700",
  Refunded: "bg-violet-100 text-violet-700",
};

const AdminAppointmentsClient = ({ initialAppointments }) => {
  const [appointments, setAppointments] = useState(
    initialAppointments.map(normalizeAppointment),
  );
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [serviceCategory, setServiceCategory] = useState("All Services");
  const [updatingId, setUpdatingId] = useState("");
  const categories = [
    "All Services",
    ...new Set(appointments.map((item) => item.category)),
  ];
  const visibleAppointments = appointments.filter(
    (item) =>
      `${item.customer} ${item.service} ${item.id}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All Statuses" || item.status === status) &&
      (serviceCategory === "All Services" || item.category === serviceCategory),
  );
  const updateStatus = async (id, nextStatus) => {
    setUpdatingId(id);
    try {
      await updateAppointment(id, { status: nextStatus });
      setAppointments((items) =>
        items.map((item) =>
          item.id === id ? { ...item, status: nextStatus } : item,
        ),
      );
      toast.add({
        title: `Appointment ${nextStatus.toLowerCase()}`,
        description: "The appointment status has been updated.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Unable to update appointment",
        description: error.message || "Please try again.",
        type: "error",
      });
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-charcoal">
          Manage Appointments
        </h1>
        <p className="mt-1 text-sm text-ash">
          View and manage all appointment requests, update their status, and see
          details.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [
            "Total Requests",
            appointments.length,
            CalendarDays,
            "bg-cream text-[#684521]",
          ],
          [
            "Pending",
            appointments.filter((item) => item.status === "Pending").length,
            Clock3,
            "bg-amber-100 text-amber-600",
          ],
          [
            "Confirmed",
            appointments.filter((item) => item.status === "Confirmed").length,
            CheckCircle2,
            "bg-green-100 text-green-600",
          ],
          [
            "Cancelled",
            appointments.filter((item) => item.status === "Cancelled").length,
            X,
            "bg-red-100 text-red-600",
          ],
        ].map(([label, value, Icon, color]) => (
          <article
            key={label}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
          >
            <span
              className={`grid size-12 place-items-center rounded-xl ${color}`}
            >
              <Icon className="size-6" />
            </span>
            <div>
              <p className="text-sm font-semibold text-charcoal">{label}</p>
              <p className="font-heading text-3xl font-semibold text-charcoal">
                {value}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-7 grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_0.8fr_0.7fr]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by customer, service or appointment ID..."
            className="h-12 w-full rounded-lg border border-border bg-card px-12 text-sm outline-none"
          />
        </label>
        <select
          value={serviceCategory}
          onChange={(event) => setServiceCategory(event.target.value)}
          className="h-12 rounded-lg border border-border bg-card px-4 text-sm"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-12 rounded-lg border border-border bg-card px-4 text-sm"
        >
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div className="mt-7 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[1050px] text-left">
          <thead className="bg-cream/50 text-xs">
            <tr>
              {[
                "Service",
                "Customer",
                "Price",
                "Appointment Date & Time",
                "Duration",
                "Status",
                "Payment",
                "Request Date",
                "Actions",
              ].map((item) => (
                <th key={item} className="px-4 py-4 font-semibold">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleAppointments.map((item) => (
              <tr key={item.id} className="border-t border-border">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {item.image && (
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-cream">
                        <Image src={item.image} alt="" fill sizes="36px" className="object-cover" />
                      </span>
                    )}
                    <span className="text-sm font-semibold">
                      {item.service}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <b className="block text-sm">{item.customer}</b>
                  <small className="text-xs text-ash">{item.email}</small>
                </td>
                <td className="px-4 py-4 text-xs">${item.price}</td>
                <td className="px-4 py-4 text-xs text-ash">
                  {item.date}
                  <br />
                  {item.time}
                </td>
                <td className="px-4 py-4 text-sm">
                  {item.duration === "—"
                    ? item.duration
                    : `${item.duration} min`}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[item.status] || tone.Pending}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[item.payment] || tone.Unpaid}`}
                  >
                    {item.payment}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs">
                  {new Date(item.createdAt).toISOString().split("T")[0]}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/admin/appointments/${item.id}`}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs font-semibold"
                    >
                      <Eye className="size-4" />
                    </Link>
                    {item.payment !== "Paid" && item.status === "Pending" ? (
                      <>
                        <button
                          disabled={updatingId === item.id}
                          onClick={() => updateStatus(item.id, "Confirmed")}
                          className="rounded-md bg-[#3c2a1d] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          Confirm
                        </button>
                        <button
                          disabled={updatingId === item.id}
                          onClick={() => updateStatus(item.id, "Cancelled")}
                          className="rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-destructive disabled:opacity-60"
                        >
                          <X className="size-4" />
                        </button>
                      </>
                    ) : item.payment !== "Paid" && item.status === "Confirmed" ? (
                      <button
                        disabled={updatingId === item.id}
                        onClick={() => updateStatus(item.id, "Cancelled")}
                        className="rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-destructive disabled:opacity-60"
                      >
                        <X className="size-4" />
                      </button>
                    ) : null}
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

export default AdminAppointmentsClient;
