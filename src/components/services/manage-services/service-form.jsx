"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { Clock3, ImagePlus, Layers3, Scissors, Upload } from "lucide-react";
import { toast } from "@/components/ui/toast";

const ServiceForm = ({ categories = [], initialService, isSaving, onSubmit, submitLabel }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialService?.image || "");
  const [status, setStatus] = useState(
    initialService?.status ?? (initialService?.isActive === false ? "inactive" : "active"),
  );

  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const price = Number(form.get("price"));
    const duration = Number(form.get("duration"));

    if ((!preview && !image) || price <= 0 || duration <= 0) {
      toast.add({
        title: "Complete the form",
        description: "Add an image and positive price and duration values.",
        type: "error",
      });
      return;
    }

    await onSubmit({
      serviceName: form.get("serviceName"),
      category: form.get("category"),
      description: form.get("description"),
      price,
      duration,
      image,
      existingImage: initialService?.image,
      status,
    });
  };

  return (
    <form
      onSubmit={submit}
      className="mt-7 grid gap-5 xl:grid-cols-[1.55fr_0.95fr]"
    >
      <div className="space-y-5">
        <section className="rounded-xl border border-border bg-card p-5 sm:p-7">
          <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold text-charcoal">
            <Scissors className="size-6" />
            Service Details
          </h2>
          <div className="mt-6 space-y-5">
            <label className="block text-sm font-semibold text-charcoal">
              Service Name <em className="not-italic text-destructive">*</em>
              <input
                name="serviceName"
                defaultValue={initialService?.serviceName || initialService?.name}
                required
                placeholder="e.g. Classic Haircut & Styling"
                className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 font-normal outline-none placeholder:text-ash"
              />
            </label>
            <label className="block text-sm font-semibold text-charcoal">
              Service Category{" "}
              <em className="not-italic text-destructive">*</em>
              <select
                name="category"
                defaultValue={initialService?.category || ""}
                required
                className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 font-normal outline-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((item) => (
                  <option key={item._id}>{item.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold text-charcoal">
              Description <em className="not-italic text-destructive">*</em>
              <textarea
                name="description"
                defaultValue={initialService?.description}
                required
                placeholder="Describe the service, what it includes, etc."
                className="mt-2 min-h-32 w-full rounded-lg border border-border bg-background p-4 font-normal outline-none placeholder:text-ash"
              />
            </label>
          </div>
        </section>
        <section className="rounded-xl border border-border bg-card p-5 sm:p-7">
          <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold text-charcoal">
            <Layers3 className="size-6" />
            Pricing &amp; Duration
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-charcoal">
              Price <em className="not-italic text-destructive">*</em>
              <span className="relative mt-2 block">
                <b className="absolute left-4 top-1/2 -translate-y-1/2">$</b>
                <input
                  name="price"
                  type="number"
                  min="1"
                  defaultValue={initialService?.price}
                  required
                  placeholder="Enter a positive number"
                  className="h-12 w-full rounded-lg border border-border bg-background px-9 font-normal outline-none placeholder:text-ash"
                />
              </span>
            </label>
            <label className="text-sm font-semibold text-charcoal">
              Estimated Duration (minutes){" "}
              <em className="not-italic text-destructive">*</em>
              <span className="relative mt-2 block">
                <Clock3 className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" />
                <input
                  name="duration"
                  type="number"
                  min="1"
                  defaultValue={initialService?.duration}
                  required
                  placeholder="Enter duration in minutes"
                  className="h-12 w-full rounded-lg border border-border bg-background px-11 font-normal outline-none placeholder:text-ash"
                />
              </span>
            </label>
          </div>
        </section>
      </div>
      <div className="space-y-5">
        <section className="rounded-xl border border-border bg-card p-5 sm:p-7">
          <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold text-charcoal">
            <ImagePlus className="size-6" />
            Service Image
          </h2>
          <label className="mt-6 flex min-h-70 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-5 text-center">
            {preview ? (
              <img
                src={preview}
                alt="Service preview"
                className="h-52 w-full rounded-lg object-cover"
              />
            ) : (
              <>
                <Upload className="size-12 text-ash" />
                <span className="mt-4 text-sm font-medium text-charcoal">
                  Drag &amp; drop an image here, or click to browse
                </span>
                <span className="mt-2 text-xs text-ash">
                  PNG, JPG, JPEG (Max 5MB)
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={selectImage}
              className="sr-only"
            />
          </label>
        </section>
        <section className="rounded-xl border border-border bg-card p-5 sm:p-7">
          <h2 className="font-heading text-2xl font-semibold text-charcoal">
            Service Status
          </h2>
          <label className="mt-6 flex gap-3 text-sm">
            <input
              type="radio"
              name="status"
              value="active"
              checked={status === "active"}
              onChange={() => setStatus("active")}
              className="size-5 accent-[#684521]"
            />{" "}
            <span>
              <b>Active</b> (Available for booking)
            </span>
          </label>
          <label className="mt-4 flex gap-3 text-sm">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
              className="size-5 accent-[#684521]"
            />{" "}
            <span>
              <b>Inactive</b> (Not available for booking)
            </span>
          </label>
        </section>
      </div>
      <div className="flex justify-end gap-3 xl:col-span-2">
        <Link
          href="/dashboard/admin/manage-services"
          className="rounded-lg border border-border px-5 py-3 text-sm font-semibold"
        >
          Cancel
        </Link>
        <button
          disabled={isSaving}
          className="rounded-lg bg-[#3c2a1d] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSaving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
