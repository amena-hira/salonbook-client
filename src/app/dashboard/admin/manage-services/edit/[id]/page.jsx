import Link from "next/link";
import { notFound } from "next/navigation";
import EditServiceForm from "@/components/services/manage-services/edit-service-form";
import { getCategories, getService } from "@/lib/api/services";

const EditServicePage = async ({ params }) => {
  const { id } = await params;
  let service;
  let categories = [];

  try {
    service = await getService(id);
  } catch {
    notFound();
  }

  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <p className="text-sm text-ash">
        <Link href="/dashboard/admin/manage-services">Manage Services</Link>
        <span className="mx-2">›</span>
        <b className="text-charcoal">Edit Service</b>
      </p>
      <h1 className="mt-4 font-heading text-3xl font-semibold text-charcoal">
        Edit Service
      </h1>
      <p className="mt-1 text-sm text-ash">
        Update the service details, pricing, image and booking availability.
      </p>
      <EditServiceForm categories={categories} service={service} serviceId={id} />
    </section>
  );
};

export default EditServicePage;
