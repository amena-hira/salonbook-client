import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyAppointmentsClient from "@/components/appointments/my-appointments-client";
import { auth } from "@/lib/auth";
import { getMyAppointments } from "@/lib/api/appointments";

const MyAppointmentsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in?redirectTo=/dashboard/customer/my-appointments");

  let appointments = [];
  try {
    const result = await getMyAppointments(session.user.id);
    appointments = Array.isArray(result) ? result : (result.appointments || result.data || []);
  } catch {
    appointments = [];
  }

  return <MyAppointmentsClient initialAppointments={appointments} customerId={session.user.id} />;
};

export default MyAppointmentsPage;
