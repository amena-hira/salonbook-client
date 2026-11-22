import ManageServicesClient from "@/components/services/manage-services-client";
import { getAllServices } from "@/lib/actions/services";

const ManageServicesPage = async () => {
  let services = [];

  try {
    const result = await getAllServices();
    console.log(result);
    services = Array.isArray(result) ? result : (result.services || result.data || []);
  } catch {
    services = [];
  }

  return <ManageServicesClient initialServices={services} />;
};

export default ManageServicesPage;
