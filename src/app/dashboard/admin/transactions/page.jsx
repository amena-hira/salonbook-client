"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  CircleX,
  Coins,
  Layers3,
  Search,
} from "lucide-react";
import { toast } from "@/components/ui/toast";

const records = [
  {
    id: "txn_9Xy3kPz8mQ",
    customer: "Sara Ahmed",
    email: "sara@example.com",
    service: "Deep Facial Treatment",
    appointment: "Nov 24, 2026",
    amount: 85,
    status: "Success",
    date: "Nov 22, 2026, 4:16 PM",
    image: "/images/services/hair-cut.jpg",
  },
  {
    id: "txn_A7b2Lm9nRt",
    customer: "Rahim Hasan",
    email: "rahim@example.com",
    service: "Classic Haircut & Styling",
    appointment: "Nov 24, 2026",
    amount: 25,
    status: "Success",
    date: "Nov 21, 2026, 2:30 PM",
    image: "/images/services/man-hair-cut.jpg",
  },
  {
    id: "txn_Pq8nK4vZt2",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    service: "Hair Color & Treatment",
    appointment: "Nov 24, 2026",
    amount: 120,
    status: "Success",
    date: "Nov 20, 2026, 11:15 AM",
    image: "/images/services/hair-color.jpg",
  },
  {
    id: "txn_Ht3mL9qRw1",
    customer: "Tanvir Alam",
    email: "tanvir@example.com",
    service: "Manicure & Pedicure",
    appointment: "Nov 25, 2026",
    amount: 40,
    status: "Failed",
    date: "Nov 19, 2026, 5:40 PM",
    image: "/images/services/man-hair-cut.jpg",
  },
  {
    id: "txn_Kd7pX1zMn5",
    customer: "Faria Islam",
    email: "faria@example.com",
    service: "Bridal Makeup",
    appointment: "Nov 25, 2026",
    amount: 250,
    status: "Success",
    date: "Nov 18, 2026, 10:00 AM",
    image: "/images/services/eye-makeup.jpg",
  },
];

const TransactionsPage = () => {
  const [payments, setPayments] = useState(records);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");

  const visiblePayments = payments.filter(
    (payment) =>
      `${payment.id} ${payment.customer} ${payment.service}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All Statuses" || payment.status === status),
  );
  const successfulPayments = payments.filter(
    (payment) => payment.status === "Success",
  );
  const totalRevenue = successfulPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  const markSuccessful = (id) => {
    setPayments((items) =>
      items.map((payment) =>
        payment.id === id ? { ...payment, status: "Success" } : payment,
      ),
    );
    toast.add({
      title: "Payment marked successful",
      description: "The transaction record was updated manually.",
      type: "success",
    });
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Transactions</h1>
        <p className="mt-1 text-sm text-ash">
          View and manage all payment transactions.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [
            "Total Transactions",
            payments.length,
            Coins,
            "bg-cream text-[#684521]",
          ],
          [
            "Successful Payments",
            successfulPayments.length,
            CheckCircle2,
            "bg-green-100 text-green-600",
          ],
          [
            "Failed Payments",
            payments.length - successfulPayments.length,
            CircleX,
            "bg-red-100 text-red-600",
          ],
          [
            "Total Revenue",
            `$${totalRevenue.toLocaleString()}.00`,
            Layers3,
            "bg-cream text-[#684521]",
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
              <p className="text-sm font-semibold">{label}</p>
              <p className="font-heading text-3xl font-semibold">{value}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_0.7fr_0.8fr]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by transaction, customer or service..."
            className="h-12 w-full rounded-lg border border-border bg-card px-12 text-sm outline-none"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-12 rounded-lg border border-border bg-card px-4 text-sm"
        >
          <option>All Statuses</option>
          <option>Success</option>
          <option>Failed</option>
        </select>
        <label className="flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm text-ash">
          <CalendarDays className="size-5" />
          Select Date Range
        </label>
      </div>

      <div className="mt-7 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[920px] table-fixed text-left">
          <colgroup>
            <col className="w-[16%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[12%]" />
            <col className="w-[11%]" />
            <col className="w-[14%]" />
            <col className="w-[7%]" />
          </colgroup>
          <thead className="bg-cream/50 text-xs">
            <tr>
              {[
                "Transaction",
                "Customer",
                "Service & Appointment",
                "Payment",
                "Status",
                "Transaction Date",
                "Action",
              ].map((label) => (
                <th key={label} className="px-4 py-4 font-semibold">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visiblePayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-border align-middle"
              >
                <td className="px-4 py-4">
                  <b className="block truncate text-sm" title={payment.id}>
                    {payment.id}
                  </b>
                  <span className="mt-1 block truncate text-xs text-ash">
                    cs_{payment.id.slice(4, 12)}...
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={payment.image}
                      alt={payment.customer}
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover"
                    />
                    <span className="min-w-0">
                      <b className="block truncate text-sm">
                        {payment.customer}
                      </b>
                      <small className="block truncate text-xs text-ash">
                        {payment.email}
                      </small>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <b className="block text-sm leading-5">{payment.service}</b>
                  <span className="mt-1 block text-xs text-ash">
                    {payment.appointment}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <b className="block text-sm">${payment.amount.toFixed(2)}</b>
                  <span className="mt-1 block text-xs text-ash">USD</span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${payment.status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    ● {payment.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-ash">{payment.date}</td>
                <td className="px-4 py-4">
                  {payment.status === "Failed" && (
                    <button
                      onClick={() => markSuccessful(payment.id)}
                      title="Mark payment successful"
                      aria-label="Mark payment successful"
                      className="grid size-9 place-items-center rounded-md bg-[#3c2a1d] text-white hover:bg-[#684521]"
                    >
                      <Check className="size-4" strokeWidth={2.5} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsPage;
