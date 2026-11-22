import ManageServicesClient from "@/components/services/manage-services-client";
import { getAllServices, getCategories } from "@/lib/actions/services";

const ManageServicesPage = async () => {
  let services = [];
  let categories = [];

  try {
    const [servicesResult, categoriesResult] = await Promise.all([getAllServices(), getCategories()]);
    services = Array.isArray(servicesResult) ? servicesResult : (servicesResult.services || servicesResult.data || []);
    categories = Array.isArray(categoriesResult) ? categoriesResult : (categoriesResult.categories || categoriesResult.data || []);
  } catch {
    services = [];
    categories = [];
  }

  return <ManageServicesClient initialCategories={categories} initialServices={services} />;
};

export default ManageServicesPage;
