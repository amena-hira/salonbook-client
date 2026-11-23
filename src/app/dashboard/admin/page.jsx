import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  Eye,
  Hourglass,
  Plus,
  Scissors,
  UsersRound,
  Zap,
} from "lucide-react";
import { getAppointments } from "@/lib/api/appointments";
import { getAdminDashboardStats } from "@/lib/api/dashboard";

const getItems = (result) =>
  Array.isArray(result)
    ? result
    : result?.data ||
      result?.appointments ||
      result?.services ||
      result?.transactions ||
      [];

const getInitial = (name) => name?.charAt(0).toUpperCase() || "U";

const AdminDashboardPage = async () => {
  const [statsResult, appointmentsResult] = await Promise.allSettled([
    getAdminDashboardStats(),
    getAppointments(),
  ]);

  const statsData = statsResult.status === "fulfilled" ? statsResult.value : {};
  const appointments =
    appointmentsResult.status === "fulfilled"
      ? getItems(appointmentsResult.value)
      : [];
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending",
  );
  const recentRequests = [...appointments]
    .sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
    )
    .slice(0, 3);

  const stats = [
    [
      "Total Registered Customers",
      statsData.totalCustomers || 0,
      UsersRound,
      "bg-violet-100 text-violet-600",
    ],
    [
      "Total Active Services",
      statsData.totalActiveServices || 0,
      Scissors,
      "bg-green-100 text-green-600",
    ],
    [
      "Total Appointment Requests",
      statsData.totalAppointments || 0,
      CalendarDays,
      "bg-sky-100 text-sky-600",
    ],
    [
      "Pending Appointments",
      statsData.pendingAppointments || 0,
      Hourglass,
      "bg-amber-100 text-amber-600",
    ],
    [
      "Confirmed Appointments",
      statsData.confirmedAppointments || 0,
      Check,
      "bg-green-100 text-green-600",
    ],
    [
      "Total Successful Payments",
      statsData.successfulPayments || 0,
      CreditCard,
      "bg-violet-100 text-violet-600",
    ],
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-charcoal">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-ash">
          Here&apos;s what&apos;s happening at your salon today.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, Icon, color]) => (
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
              <p className="mt-1 font-heading text-3xl font-semibold text-charcoal">
                {value}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,0.82fr)]">
        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-charcoal">
              <CalendarDays className="size-5" />
              Recent Appointment Requests
            </h3>
            <Link
              href="/dashboard/admin/appointments"
              className="inline-flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-ash"
            >
              View All <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-border bg-cream/40 text-xs text-ash">
                <tr>
                  {[
                    "Customer",
                    "Service",
                    "Date & Time",
                    "Status",
                    "Action",
                  ].map((label) => (
                    <th
                      key={label}
                      className="px-4 py-3 font-medium first:px-5 last:px-5 last:text-right"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((appointment) => {
                  const customer = appointment.customer || {};
                  const service = appointment.service || {};
                  return (
                    <tr
                      key={appointment._id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          {customer.image ? (
                            <Image
                              src={customer.image}
                              alt={customer.name || "Customer"}
                              width={36}
                              height={36}
                              className="size-9 rounded-full object-cover"
                            />
                          ) : (
                            <span className="grid size-9 place-items-center rounded-full bg-cream text-xs font-semibold">
                              {getInitial(customer.name)}
                            </span>
                          )}
                          <span className="text-sm font-semibold text-charcoal">
                            {customer.name || "Unknown customer"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-charcoal">
                        {service.serviceName || "Unknown service"}
                      </td>
                      <td className="px-4 py-4 text-xs text-ash">
                        {appointment.appointmentDate}
                        <br />
                        {appointment.timeSlot}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === "Confirmed" ? "bg-green-100 text-green-700" : appointment.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/dashboard/admin/appointments/${appointment._id}`}
                          aria-label="View appointment"
                          className="inline-grid size-8 place-items-center rounded-md border border-border text-charcoal hover:bg-cream"
                        >
                          <Eye className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {recentRequests.length === 0 && (
              <p className="px-5 py-10 text-center text-sm text-ash">
                No appointment requests found.
              </p>
            )}
          </div>
        </section>

        <div className="space-y-5">
          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <Hourglass className="size-5 text-charcoal" />
              <h3 className="font-heading text-xl font-semibold text-charcoal">
                Pending Requests ({pendingAppointments.length})
              </h3>
            </div>
            <div>
              {pendingAppointments.slice(0, 3).map((appointment) => {
                const customer = appointment.customer || {};
                const service = appointment.service || {};
                return (
                  <Link
                    key={appointment._id}
                    href={`/dashboard/admin/appointments/${appointment._id}`}
                    className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-0 hover:bg-cream"
                  >
                    {customer.image ? (
                      <Image
                        src={customer.image}
                        alt={customer.name || "Customer"}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid size-10 place-items-center rounded-full bg-cream text-sm font-semibold">
                        {getInitial(customer.name)}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-charcoal">
                        {customer.name || "Unknown customer"}
                      </span>
                      <span className="block truncate text-xs text-ash">
                        {service.serviceName || "Unknown service"}
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-ash" />
                  </Link>
                );
              })}
              {pendingAppointments.length === 0 && (
                <p className="px-5 py-8 text-center text-sm text-ash">
                  No pending requests.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-charcoal">
              <Zap className="size-5" />
              Quick Actions
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/dashboard/admin/manage-services/new"
                className="inline-flex items-center gap-2 rounded-lg bg-[#3c2a1d] px-3 py-2.5 text-sm font-semibold text-white hover:bg-charcoal"
              >
                <Plus className="size-4" />
                Add Service
              </Link>
              <Link
                href="/dashboard/admin/appointments"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-semibold text-charcoal hover:bg-cream"
              >
                <CalendarDays className="size-4" />
                Appointments
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
