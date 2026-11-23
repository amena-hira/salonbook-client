"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  CircleX,
  Coins,
  Eye,
  Layers3,
  Search,
} from "lucide-react";

const formatDate = (value) =>
  new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const normalizeTransaction = (transaction) => ({
  id: transaction._id,
  transactionId: transaction.transactionId || transaction._id,
  appointmentId: transaction.appointmentId,
  customer: transaction.customer?.name || "Unknown customer",
  email: transaction.customer?.email || "—",
  image: transaction.customer?.image,
  service: transaction.service?.serviceName || "Unknown service",
  appointment: transaction.appointment?.appointmentDate || "—",
  timeSlot: transaction.appointment?.timeSlot,
  amount: Number(transaction.amount || 0),
  currency: (transaction.currency || "usd").toUpperCase(),
  status: transaction.status,
  date: formatDate(transaction.createdAt),
});

const AdminTransactionsClient = ({ initialTransactions }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const payments = initialTransactions.map(normalizeTransaction);
  const visiblePayments = payments.filter(
    (payment) =>
      `${payment.transactionId} ${payment.customer} ${payment.service}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All Statuses" || payment.status === status),
  );
  const paidPayments = payments.filter((payment) => payment.status === "Paid");
  const totalRevenue = paidPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Transactions</h1>
        <p className="mt-1 text-sm text-ash">
          View all completed payment transactions.
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
            "Paid Payments",
            paidPayments.length,
            CheckCircle2,
            "bg-green-100 text-green-600",
          ],
          [
            "Other Payments",
            payments.length - paidPayments.length,
            CircleX,
            "bg-red-100 text-red-600",
          ],
          [
            "Total Revenue",
            `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
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
          <option>Paid</option>
          <option>Failed</option>
        </select>
        <span className="flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm text-ash">
          <CalendarDays className="size-5" /> Transaction history
        </span>
      </div>

      <div className="mt-7 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[1050px] text-left">
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
                  <b
                    className="block max-w-52 truncate text-sm"
                    title={payment.transactionId}
                  >
                    {payment.transactionId}
                  </b>
                  <span className="mt-1 block text-xs text-ash">
                    Stripe transaction
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {payment.image ? (
                      <Image
                        src={payment.image}
                        alt={payment.customer}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid size-10 place-items-center rounded-full bg-cream text-sm font-semibold">
                        {payment.customer.charAt(0)}
                      </span>
                    )}
                    <span className="min-w-0">
                      <b className="block max-w-40 truncate text-sm">
                        {payment.customer}
                      </b>
                      <small className="block max-w-40 truncate text-xs text-ash">
                        {payment.email}
                      </small>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <b className="block text-sm leading-5">{payment.service}</b>
                  <span className="mt-1 block text-xs text-ash">
                    {payment.appointment} - {payment.timeSlot}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <b className="block text-sm">${payment.amount.toFixed(2)}</b>
                  <span className="mt-1 block text-xs text-ash">
                    {payment.currency}
                  </span>
                </td>
                <td className="min-w-28 px-4 py-4">
                  <span
                    className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${payment.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    ● {payment.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-ash">{payment.date}</td>
                <td className="px-4 py-4">
                  <Link
                    href={`/dashboard/admin/appointments/${payment.appointmentId}`}
                    aria-label="View appointment"
                    title="View appointment"
                    className="grid size-9 place-items-center rounded-md border border-border hover:bg-cream"
                  >
                    <Eye className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visiblePayments.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-ash">
            No transactions found.
          </p>
        )}
      </div>
    </section>
  );
};

export default AdminTransactionsClient;
