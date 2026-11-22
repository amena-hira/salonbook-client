"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Clock3,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { updateService } from "@/lib/actions/services";

const DEFAULT_SERVICE_IMAGE = "/images/services/brushing.jpg";

const normalizeService = (service) => ({
  ...service,
  id: service._id || service.id,
  name: service.serviceName || service.name,
  image: service.image || service.imageUrl || service.serviceImage || DEFAULT_SERVICE_IMAGE,
  active: service.status
    ? service.status === "active"
    : (service.isActive ?? true),
});

const ManageServicesClient = ({ initialServices }) => {
  const [services, setServices] = useState(
    initialServices.map(normalizeService),
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Statuses");
  const [updatingId, setUpdatingId] = useState("");
  const categories = [
    "All Categories",
    ...new Set(services.map((service) => service.category)),
  ];
  const visibleServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All Categories" || service.category === category) &&
      (status === "All Statuses" ||
        (status === "Active" ? service.active : !service.active)),
  );

  const toggleService = async (service) => {
    const nextStatus = service.active ? "inactive" : "active";
    setUpdatingId(service.id);

    try {
      await updateService(service.id, { status: nextStatus });
      setServices((current) =>
        current.map((item) =>
          item.id === service.id ? { ...item, active: !item.active } : item,
        ),
      );
      toast.add({
        title: `Service ${nextStatus}`,
        description: `${service.name} is now ${nextStatus}.`,
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Unable to update service",
        description: error.message || "Please try again.",
        type: "error",
      });
    } finally {
      setUpdatingId("");
    }
  };
  const showToast = (title) =>
    toast.add({
      title,
      description:
        "This action will be available when the service API is connected.",
      type: "info",
    });

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-charcoal">
            Manage Services
          </h1>
          <p className="mt-1 text-sm text-ash">
            Manage all salon services, availability and pricing.
          </p>
        </div>
        <Link
          href="/dashboard/admin/manage-services/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#3c2a1d] px-5 text-sm font-semibold text-white hover:bg-charcoal"
        >
          <Plus className="size-5" />
          Add New Service
        </Link>
      </div>
      <div className="mt-7 grid gap-3 lg:grid-cols-[minmax(0,1.45fr)_0.85fr_0.85fr]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search services by name..."
            className="h-12 w-full rounded-lg border border-border bg-card px-12 text-sm text-charcoal outline-none placeholder:text-ash focus:border-charcoal"
          />
        </label>
        <label className="relative">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 w-full appearance-none rounded-lg border border-border bg-card px-4 pr-10 text-sm font-medium text-charcoal outline-none focus:border-charcoal"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2" />
        </label>
        <label className="relative">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-12 w-full appearance-none rounded-lg border border-border bg-card px-4 pr-10 text-sm font-medium text-charcoal outline-none focus:border-charcoal"
          >
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2" />
        </label>
      </div>
      <div className="mt-7 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[1050px] table-fixed text-left">
          <colgroup>
            <col className="w-[28%]" />
            <col className="w-[16%]" />
            <col className="w-[10%]" />
            <col className="w-[11%]" />
            <col className="w-[11%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
          </colgroup>
          <thead className="border-b border-border bg-cream/50 text-xs text-charcoal">
            <tr>
              {[
                "Service",
                "Category",
                "Price",
                "Duration",
                "Status",
                "Activate/Deactivate",
                "Actions",
              ].map((label) => (
                <th
                  key={label}
                  className="px-4 py-4 font-semibold first:px-5 last:px-5 last:text-right"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleServices.map((service) => (
              <tr
                key={service.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="size-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                      <img
                        src={service.image}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.src = DEFAULT_SERVICE_IMAGE;
                        }}
                        className="size-full object-cover"
                      />
                    </span>
                    <span className="min-w-0 truncate text-sm font-semibold text-charcoal">
                      {service.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-cream px-3 py-1.5 text-xs font-medium text-charcoal">
                    {service.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-charcoal">
                  ${service.price}
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-sm text-charcoal">
                    <Clock3 className="size-4" />
                    {service.duration} min
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${service.active ? "bg-green-100 text-green-700" : "bg-muted text-ash"}`}
                  >
                    {service.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggleService(service)}
                    disabled={updatingId === service.id}
                    aria-label={`Set ${service.name} ${service.active ? "inactive" : "active"}`}
                    className={`relative h-7 w-12 rounded-full transition-colors disabled:cursor-wait disabled:opacity-60 ${service.active ? "bg-[#684521]" : "bg-muted"}`}
                  >
                    <span
                      className={`absolute top-1 size-5 rounded-full bg-white transition-transform ${service.active ? "left-6" : "left-1"}`}
                    />
                  </button>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dashboard/admin/manage-services/edit/${service.id}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-charcoal hover:bg-cream"
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => showToast("Delete service")}
                      className="inline-flex items-center gap-1.5 rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-ash">
            No services found.
          </p>
        )}
      </div>
    </section>
  );
};

export default ManageServicesClient;
