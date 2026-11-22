"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ServiceForm from "@/components/services/service-form";
import { toast } from "@/components/ui/toast";

const AddServicePage = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const createService = async ({ image, ...service }) => {
    if (!image) return;
    setIsSaving(true);
    try {
      const imageForm = new FormData();
      imageForm.append("image", image);
      const uploadResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: imageForm },
      );
      const upload = await uploadResponse.json();
      if (!uploadResponse.ok || !upload.success)
        throw new Error("Unable to upload image.");

      const serviceData= {
        ...service,
        image: upload.data.url
      }

      console.log("service data:", serviceData);

      const response = await createService(serviceData);

      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/services`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ ...service, image: upload.data.url }),
      //   },
      // );

      console.log("response: ",response);
      if (!response.ok) throw new Error("Unable to add service.");
      toast.add({
        title: "Service added",
        description: "The new service is available in Manage Services.",
        type: "success",
      });
      router.push("/dashboard/admin/manage-services");
    } catch (error) {
      toast.add({
        title: "Service creation failed",
        description: error.message || "Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <p className="text-sm text-ash">
        <Link href="/dashboard/admin/manage-services">Manage Services</Link>
        <span className="mx-2">›</span>
        <b className="text-charcoal">Add New Service</b>
      </p>
      <h1 className="mt-4 font-heading text-3xl font-semibold text-charcoal">
        Add New Service
      </h1>
      <p className="mt-1 text-sm text-ash">
        Create a new salon service with complete details, pricing, duration,
        image and status.
      </p>
      <ServiceForm
        isSaving={isSaving}
        onSubmit={createService}
        submitLabel="Add Service"
      />
    </section>
  );
};

export default AddServicePage;
