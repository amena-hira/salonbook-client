import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import AppointmentDetails from "@/components/appointments/appointment-details";
import { auth } from "@/lib/auth";
import { getAppointmentById } from "@/lib/actions/appointments";

const MyAppointmentDetailsPage = async ({ params }) => {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in?redirectTo=/dashboard/customer/my-appointments");

  let appointment;
  try {
    appointment = await getAppointmentById(id);
  } catch {
    notFound();
  }

  if (!appointment || appointment.customerId !== session.user.id) notFound();

  return (
    <AppointmentDetails
      appointment={appointment}
      backHref="/dashboard/customer/my-appointments"
      backLabel="My Appointments"
    />
  );
};

export default MyAppointmentDetailsPage;
