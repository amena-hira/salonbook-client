import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Check, ChevronRight, CreditCard, Eye, Hourglass, Plus, Scissors, UsersRound, X, Zap } from "lucide-react";

const stats = [
  { label: "Total Registered Customers", value: "142", icon: UsersRound, color: "bg-violet-100 text-violet-600" },
  { label: "Total Active Services", value: "15", icon: Scissors, color: "bg-green-100 text-green-600" },
  { label: "Total Appointment Requests", value: "86", icon: CalendarDays, color: "bg-sky-100 text-sky-600" },
  { label: "Pending Appointments", value: "12", icon: Hourglass, color: "bg-amber-100 text-amber-600" },
  { label: "Confirmed Appointments", value: "35", icon: Check, color: "bg-green-100 text-green-600" },
  { label: "Total Successful Payments", value: "58", icon: CreditCard, color: "bg-violet-100 text-violet-600" },
];

const requests = [
  { customer: "Sarah Ahmed", service: "Classic Haircut & Styling", date: "Nov 25, 2026, 2:00 PM", status: "Pending", image: "/images/services/hair-cut.jpg" },
  { customer: "Arif Hossain", service: "Hair Color & Treatment", date: "Nov 24, 2026, 4:00 PM", status: "Confirmed", image: "/images/services/man-hair-cut.jpg" },
  { customer: "Nusrat Jahan", service: "Beard Trimming", date: "Nov 24, 2026, 11:00 AM", status: "Pending", image: "/images/services/hair-color.jpg" },
];

const pendingRequests = [
  { customer: "Sarah Ahmed", service: "Classic Haircut & Styling", image: "/images/services/hair-cut.jpg" },
  { customer: "Nusrat Jahan", service: "Hair Color & Treatment", image: "/images/services/hair-color.jpg" },
  { customer: "Tanvir Hasan", service: "Beard Trimming", image: "/images/services/man-hair-cut.jpg" },
];

const AdminDashboardPage = () => (
  <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
    <div>
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-charcoal">Dashboard</h2>
      <p className="mt-1 text-sm text-ash">Welcome back, Admin! Here&apos;s what&apos;s happening at your salon today.</p>
    </div>

    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <article key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <span className={`grid size-12 place-items-center rounded-xl ${color}`}><Icon className="size-6" aria-hidden="true" /></span>
          <div><p className="text-sm font-semibold text-charcoal">{label}</p><p className="mt-1 font-heading text-3xl font-semibold text-charcoal">{value}</p></div>
        </article>
      ))}
    </div>

    <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,0.82fr)]">
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-charcoal"><CalendarDays className="size-5" aria-hidden="true" />Recent Appointment Requests</h3>
          <Link href="/dashboard/admin/appointments" className="inline-flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-ash">View All <ChevronRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="border-b border-border bg-cream/40 text-xs text-ash">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date &amp; Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.customer} className="border-b border-border last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <Image src={request.image} alt="" width={36} height={36} className="size-9 rounded-full object-cover" />
                      <span className="text-sm font-semibold text-charcoal">{request.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-charcoal">{request.service}</td>
                  <td className="px-4 py-4 text-xs text-ash">{request.date}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${request.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {request.status === "Pending" ?
                        <>
                          <button type="button" aria-label={`Approve ${request.customer}`} className="grid size-8 place-items-center rounded-md bg-green-100 text-green-700">
                            <Check className="size-4" />
                          </button>
                          <button type="button" aria-label={`Reject ${request.customer}`} className="grid size-8 place-items-center rounded-md bg-red-100 text-red-700">
                            <X className="size-4" /></button></>
                        :
                        <button type="button" aria-label={`View ${request.customer}`} className="grid size-8 place-items-center rounded-md border border-border text-charcoal">
                          <Eye className="size-4" />
                        </button>}
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-5">
        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Hourglass className="size-5 text-charcoal" aria-hidden="true" />
            <h3 className="font-heading text-xl font-semibold text-charcoal">Pending Requests (12)</h3>
          </div>
          <div>
            {pendingRequests.map((request) => (<button key={request.customer} type="button" className="flex w-full items-center gap-3 border-b border-border px-5 py-3 text-left last:border-0 hover:bg-cream">
              <Image src={request.image} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-charcoal">{request.customer}</span>
                <span className="block truncate text-xs text-ash">{request.service}</span>
              </span>
              <ChevronRight className="size-4 text-ash" aria-hidden="true" />
            </button>))}
          </div>
        </section>
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-charcoal">
            <Zap className="size-5" aria-hidden="true" />
            Quick Actions
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/dashboard/admin/manage-services" className="inline-flex items-center gap-2 rounded-lg bg-[#3c2a1d] px-2 py-2.5 text-sm font-semibold text-white hover:bg-charcoal">
              <Plus className="size-4" />
              Add Service</Link>
            <Link href="/dashboard/admin/categories" className="inline-flex items-center gap-2 rounded-lg border border-border px-2 py-2.5 text-sm font-semibold text-charcoal hover:bg-cream">
              <Plus className="size-4" />
              Add Category</Link>
          </div>
        </section>
      </div>
    </div>
  </section>
);

export default AdminDashboardPage;
