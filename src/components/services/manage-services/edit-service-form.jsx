"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceForm from "@/components/services/manage-services/service-form";
import { toast } from "@/components/ui/toast";
import { updateService } from "@/lib/actions/services";

const EditServiceForm = ({ categories, service, serviceId }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const saveService = async ({ image, existingImage, ...serviceData }) => {
    setIsSaving(true);
    try {
      let imageUrl = existingImage;

      if (image) {
        const imageForm = new FormData();
        imageForm.append("image", image);
        const uploadResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: imageForm },
        );
        const upload = await uploadResponse.json();
        if (!uploadResponse.ok || !upload.success) {
          throw new Error("Unable to upload image.");
        }
        imageUrl = upload.data.url;
      }

      await updateService(serviceId, { ...serviceData, image: imageUrl });
      toast.add({ title: "Service updated", description: "The service changes have been saved.", type: "success" });
      router.push("/dashboard/admin/manage-services");
    } catch (error) {
      toast.add({ title: "Service update failed", description: error.message || "Please try again.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return <ServiceForm categories={categories} initialService={service} isSaving={isSaving} onSubmit={saveService} submitLabel="Update Service" />;
};

export default EditServiceForm;
