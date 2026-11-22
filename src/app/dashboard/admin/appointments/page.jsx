"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Search,
  X,
} from "lucide-react";
import { toast } from "@/components/ui/toast";

const initialAppointments = [
  {
    id: "AP-001",
    customer: "Sara Ahmed",
    email: "sara@example.com",
    service: "Classic Haircut & Styling",
    date: "Nov 24, 2026",
    time: "10:00 AM",
    duration: 60,
    status: "Pending",
    payment: "Unpaid",
    price: 45,
    message: "Please keep the style natural.",
    bookedAt: "Nov 20, 2026",
    image: "/images/services/hair-cut.jpg",
  },
  {
    id: "AP-002",
    customer: "Rahim Hasan",
    email: "rahim@example.com",
    service: "Deep Facial Treatment",
    date: "Nov 24, 2026",
    time: "11:30 AM",
    duration: 75,
    status: "Confirmed",
    payment: "Paid",
    price: 85,
    message: "",
    bookedAt: "Nov 20, 2026",
    image: "/images/services/man-hair-cut.jpg",
  },
  {
    id: "AP-003",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    service: "Hair Color & Treatment",
    date: "Nov 24, 2026",
    time: "2:00 PM",
    duration: 90,
    status: "Pending",
    payment: "Unpaid",
    price: 120,
    message: "I would like warm brown tones.",
    bookedAt: "Nov 21, 2026",
    image: "/images/services/hair-color.jpg",
  },
  {
    id: "AP-004",
    customer: "Tanvir Alam",
    email: "tanvir@example.com",
    service: "Manicure & Pedicure",
    date: "Nov 25, 2026",
    time: "10:00 AM",
    duration: 60,
    status: "Confirmed",
    payment: "Paid",
    price: 65,
    message: "",
    bookedAt: "Nov 21, 2026",
    image: "/images/services/man-hair-cut.jpg",
  },
  {
    id: "AP-005",
    customer: "Faria Islam",
    email: "faria@example.com",
    service: "Bridal Makeup",
    date: "Nov 25, 2026",
    time: "1:00 PM",
    duration: 120,
    status: "Cancelled",
    payment: "Refunded",
    price: 150,
    message: "",
    bookedAt: "Nov 21, 2026",
    image: "/images/services/eye-makeup.jpg",
  },
  {
    id: "AP-006",
    customer: "Imran Hossain",
    email: "imran@example.com",
    service: "Relaxing Spa Massage",
    date: "Nov 25, 2026",
    time: "4:00 PM",
    duration: 90,
    status: "Confirmed",
    payment: "Paid",
    price: 100,
    message: "",
    bookedAt: "Nov 22, 2026",
    image: "/images/services/man-hair-cut.jpg",
  },
];

const tone = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-red-100 text-red-700",
  Refunded: "bg-violet-100 text-violet-700",
};

const AdminAppointmentsPage = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [selected, setSelected] = useState(null);
  const visible = appointments.filter(
    (item) =>
      `${item.customer} ${item.service} ${item.id}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All Statuses" || item.status === status),
  );
  const updateStatus = (id, nextStatus) => {
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
            appointments.filter((a) => a.status === "Pending").length,
            Clock3,
            "bg-amber-100 text-amber-600",
          ],
          [
            "Confirmed",
            appointments.filter((a) => a.status === "Confirmed").length,
            CheckCircle2,
            "bg-green-100 text-green-600",
          ],
          [
            "Cancelled",
            appointments.filter((a) => a.status === "Cancelled").length,
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer, service or appointment ID..."
            className="h-12 w-full rounded-lg border border-border bg-card px-12 text-sm outline-none"
          />
        </label>
        <select
          className="h-12 rounded-lg border border-border bg-card px-4 text-sm"
          defaultValue="All Services"
        >
          <option>All Services</option>
          <option>Haircut</option>
          <option>Facial</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-12 rounded-lg border border-border bg-card px-4 text-sm"
        >
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div className="mt-7 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[1100px] text-left">
          <thead className="bg-cream/50 text-xs">
            <tr>
              {[,
                "Customer",
                "Service",
                "Appointment Date & Time",
                "Duration",
                "Status",
                "Payment",
                "Actions",
              ].map((item) => (
                <th key={item} className="px-4 py-4 font-semibold">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((item) => (
              <tr key={item.id} className="border-t border-border">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.image}
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 rounded-full object-cover"
                    />
                    <span>
                      <b className="block text-sm">{item.customer}</b>
                      <small className="text-xs text-ash">{item.email}</small>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-semibold">
                  {item.service}
                </td>
                <td className="px-4 py-4 text-xs text-ash">
                  {item.date}
                  <br />
                  {item.time}
                </td>
                <td className="px-4 py-4 text-sm">{item.duration} min</td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[item.payment]}`}
                  >
                    {item.payment}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(item)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs font-semibold"
                    >
                      <Eye className="size-4" />
                      View
                    </button>
                    {item.status === "Pending" ? (
                      <button
                        onClick={() => updateStatus(item.id, "Confirmed")}
                        className="rounded-md bg-[#3c2a1d] px-3 py-2 text-xs font-semibold text-white"
                      >
                        Confirm
                      </button>
                    ) : item.status === "Confirmed" ? (
                      <button
                        onClick={() => updateStatus(item.id, "Cancelled")}
                        className="rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-destructive"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-card p-6 shadow-xl">
            <div className="flex justify-between">
              <h2 className="font-heading text-2xl font-semibold">
                Appointment Details
              </h2>
              <button onClick={() => setSelected(null)}>
                <X />
              </button>
            </div>
            <div className="mt-5 grid gap-3 text-sm">
              <p>
                <b>Customer:</b> {selected.customer} ({selected.email})
              </p>
              <p>
                <b>Service:</b> {selected.service} — ${selected.price}
              </p>
              <p>
                <b>Appointment:</b> {selected.date}, {selected.time} (
                {selected.duration} min)
              </p>
              <p>
                <b>Status:</b> {selected.status} · <b>Payment:</b>{" "}
                {selected.payment}
              </p>
              <p>
                <b>Booking Request Date:</b> {selected.bookedAt}
              </p>
              <p>
                <b>Customer Message:</b>{" "}
                {selected.message || "No message provided."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminAppointmentsPage;
