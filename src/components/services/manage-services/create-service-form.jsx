"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceForm from "@/components/services/manage-services/service-form";
import { toast } from "@/components/ui/toast";
import { addNewService } from "@/lib/actions/services";

const CreateServiceForm = ({ categories }) => {
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

      const response = await addNewService({
        ...service,
        image: upload.data.url,
      });
      if (!response.acknowledged) throw new Error("Unable to add service.");
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
    <ServiceForm
      categories={categories}
      isSaving={isSaving}
      onSubmit={createService}
      submitLabel="Add Service"
    />
  );
};

export default CreateServiceForm;
