"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Clock3, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

const initialServices = [
  { id: 1, name: "Classic Haircut & Styling", category: "Haircut & Styling", price: 45, duration: 60, active: true, image: "/images/services/man-hair-cut.jpg" },
  { id: 2, name: "Hair Color & Treatment", category: "Hair Coloring", price: 120, duration: 90, active: true, image: "/images/services/hair-color.jpg" },
  { id: 3, name: "Deep Facial Treatment", category: "Facial & Skincare", price: 85, duration: 75, active: true, image: "/images/services/facial.jpg" },
  { id: 4, name: "Bridal Makeup", category: "Makeup", price: 150, duration: 120, active: false, image: "/images/services/eye-makeup.jpg" },
  { id: 5, name: "Manicure & Pedicure", category: "Manicure & Pedicure", price: 65, duration: 60, active: true, image: "/images/services/nails-and-hair.jpg" },
  { id: 6, name: "Relaxing Spa Massage", category: "Spa & Massage", price: 100, duration: 90, active: false, image: "/images/services/wellness-spa-towels.jpg" },
];

const ManageServicesPage = () => {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Statuses");
  const categories = ["All Categories", ...new Set(initialServices.map((service) => service.category))];
  const visibleServices = services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase()) && (category === "All Categories" || service.category === category) && (status === "All Statuses" || (status === "Active" ? service.active : !service.active)));
  const toggleService = (id) => setServices((current) => current.map((service) => service.id === id ? { ...service, active: !service.active } : service));
  const showToast = (title) => toast.add({ title, description: "This action will be available when the service API is connected.", type: "info" });

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-heading text-3xl font-semibold tracking-tight text-charcoal">Manage Services</h2><p className="mt-1 text-sm text-ash">Manage all salon services, availability and pricing.</p></div><button type="button" onClick={() => showToast("Add new service")} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#3c2a1d] px-5 text-sm font-semibold text-white hover:bg-charcoal"><Plus className="size-5" aria-hidden="true" />Add New Service</button></div>
      <div className="mt-7 grid gap-3 lg:grid-cols-[minmax(0,1.45fr)_0.85fr_0.85fr]"><label className="relative block"><Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search services by name..." className="h-12 w-full rounded-lg border border-border bg-card px-12 text-sm text-charcoal outline-none placeholder:text-ash focus:border-charcoal" /></label><label className="relative"><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 w-full appearance-none rounded-lg border border-border bg-card px-4 pr-10 text-sm font-medium text-charcoal outline-none focus:border-charcoal">{categories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2" aria-hidden="true" /></label><label className="relative"><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-12 w-full appearance-none rounded-lg border border-border bg-card px-4 pr-10 text-sm font-medium text-charcoal outline-none focus:border-charcoal"><option>All Statuses</option><option>Active</option><option>Inactive</option></select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2" aria-hidden="true" /></label></div>
      <div className="mt-7 overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[1000px] text-left"><thead className="border-b border-border bg-cream/50 text-xs text-charcoal"><tr><th className="px-5 py-4 font-semibold">Service</th><th className="px-4 py-4 font-semibold">Category</th><th className="px-4 py-4 font-semibold">Price</th><th className="px-4 py-4 font-semibold">Duration</th><th className="px-4 py-4 font-semibold">Status</th><th className="px-4 py-4 font-semibold">Activate/Deactivate</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr></thead><tbody>{visibleServices.map((service) => <tr key={service.id} className="border-b border-border last:border-0"><td className="px-5 py-3"><div className="flex items-center gap-3"><Image src={service.image} alt={service.name} width={56} height={56} className="size-14 rounded-lg object-cover" /><span className="text-sm font-semibold text-charcoal">{service.name}</span></div></td><td className="px-4 py-3"><span className="rounded-md bg-cream px-3 py-1.5 text-xs font-medium text-charcoal">{service.category}</span></td><td className="px-4 py-3 text-sm font-semibold text-charcoal">${service.price}</td><td className="px-4 py-3"><span className="flex items-center gap-1.5 text-sm text-charcoal"><Clock3 className="size-4" aria-hidden="true" />{service.duration} min</span></td><td className="px-4 py-3"><span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${service.active ? "bg-green-100 text-green-700" : "bg-muted text-ash"}`}>{service.active ? "Active" : "Inactive"}</span></td><td className="px-4 py-3"><button type="button" onClick={() => toggleService(service.id)} aria-label={`Set ${service.name} ${service.active ? "inactive" : "active"}`} className={`relative h-7 w-12 rounded-full transition-colors ${service.active ? "bg-[#684521]" : "bg-muted"}`}><span className={`absolute top-1 size-5 rounded-full bg-white transition-transform ${service.active ? "left-6" : "left-1"}`} /></button></td><td className="px-5 py-3"><div className="flex justify-end gap-2"><button type="button" onClick={() => showToast("Edit service")} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-charcoal hover:bg-cream"><Pencil className="size-4" aria-hidden="true" />Edit</button><button type="button" onClick={() => showToast("Delete service")} className="inline-flex items-center gap-1.5 rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"><Trash2 className="size-4" aria-hidden="true" />Delete</button></div></td></tr>)}</tbody></table></div>
    </section>
  );
};

export default ManageServicesPage;
