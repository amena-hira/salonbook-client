import { protectedMutation } from "../core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// customer part
export const addNewAppointment = async (data) => {
  const api = `${BASE_URL}/appointments`;
  const res = await protectedMutation(api, "POST", data);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Unable to book appointment");
  return result;
};

export const getMyAppointments = async (customerId) => {
  const res = await fetch(`${BASE_URL}/my-appointments/${customerId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Unable to load appointments");
  }
  return await res.json();
};

export const cancelMyAppointment = async (appointmentId, customerId) => {
  const res = await protectedMutation(
    `${BASE_URL}/my-appointments/${appointmentId}`,
    "PATCH",
    { customerId },
  );
  if (!res.ok) throw new Error("Unable to cancel appointment");
  return res.json();
};

// Admin part
export const getAppointments = async () => {
  const res = await fetch(`${BASE_URL}/appointments`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Unable to load appointments");
  }
  return await res.json();
};

export const getAppointmentById = async (appointmentId) => {
  const res = await fetch(`${BASE_URL}/appointments/${appointmentId}`, {
    cache: "no-store",
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Unable to load appointment");
  }

  return result;
};

export const updateAppointment = async (appointmentId, data) => {
  const res = await protectedMutation(
    `${BASE_URL}/appointments/${appointmentId}`,
    "PATCH",
    data,
  );
  if (!res.ok) throw new Error("Unable to update appointment");
  return res.json();
};
