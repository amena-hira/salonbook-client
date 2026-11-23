import { notFound } from "next/navigation";
import AppointmentDetails from "@/components/appointments/appointment-details";
import { getAppointmentById } from "@/lib/api/appointments";

const AppointmentDetailsPage = async ({ params }) => {
  const { id } = await params;
  let appointment;

  try {
    appointment = await getAppointmentById(id);
  } catch {
    notFound();
  }

  if (!appointment) notFound();

  return (
    <AppointmentDetails
      appointment={appointment}
      backHref="/dashboard/admin/appointments"
      backLabel="Manage Appointments"
    />
  );
};

export default AppointmentDetailsPage;
