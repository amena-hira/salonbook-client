import Link from "next/link";
import CreateServiceForm from "@/components/services/manage-services/create-service-form";
import { getCategories } from "@/lib/api/services";

const AddServicePage = async () => {
  let categories = [];

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
        <b className="text-charcoal">Add New Service</b>
      </p>
      <h1 className="mt-4 font-heading text-3xl font-semibold text-charcoal">
        Add New Service
      </h1>
      <p className="mt-1 text-sm text-ash">
        Create a new salon service with complete details, pricing, duration,
        image and status.
      </p>
      <CreateServiceForm categories={categories} />
    </section>
  );
};

export default AddServicePage;
