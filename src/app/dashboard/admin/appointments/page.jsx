import AdminAppointmentsClient from "@/components/appointments/admin-appointments-client";
import { getAppointments } from "@/lib/api/appointments";

const AdminAppointmentsPage = async () => {
  let appointments = [];

  try {
    const result = await getAppointments();
    appointments = Array.isArray(result) ? result : (result.appointments || result.data || []);
  } catch {
    appointments = [];
  }

  return <AdminAppointmentsClient initialAppointments={appointments} />;
};

export default AdminAppointmentsPage;
