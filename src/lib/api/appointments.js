"use server";

import { authFetch, protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.BACKEND_URL || "http://localhost:8000";

// Customer API: create a new appointment request.
export const addNewAppointment = async (data) => {
  const res = await protectedMutation(`${BASE_URL}/appointments`, "POST", data);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Unable to book appointment");
  return result;
};

// Customer API: load the signed-in customer's appointments.
export const getMyAppointments = async (customerId) => {
  const res = await authFetch(`${BASE_URL}/my-appointments/${customerId}`);
  if (!res.ok) throw new Error("Unable to load appointments");
  return res.json();
};

// Customer API: cancel the customer's pending appointment.
export const cancelMyAppointment = async (appointmentId, customerId) => {
  const res = await protectedMutation(
    `${BASE_URL}/my-appointments/${appointmentId}`,
    "PATCH",
    { customerId },
  );
  if (!res.ok) throw new Error("Unable to cancel appointment");
  return res.json();
};

// Admin API: load all appointments for management.
export const getAppointments = async () => {
  const res = await authFetch(`${BASE_URL}/appointments`);
  if (!res.ok) throw new Error("Unable to load appointments");
  return res.json();
};

// Customer API: load booked time slots for one service and date.
export const getAvailableTimeSlots = async (serviceId, appointmentDate) => {
  const res = await authFetch(
    `${BASE_URL}/appointments/availability?serviceId=${serviceId}&appointmentDate=${appointmentDate}`,
  );
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Unable to load available time slots");
  }
  return result;
};

// Both API: load one appointment for admin or its owning customer.
export const getAppointmentById = async (appointmentId) => {
  const res = await authFetch(`${BASE_URL}/appointments/${appointmentId}`);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Unable to load appointment");
  return result;
};

// Admin API: confirm or cancel an appointment.
export const updateAppointment = async (appointmentId, data) => {
  const res = await protectedMutation(
    `${BASE_URL}/appointments/${appointmentId}`,
    "PATCH",
    data,
  );
  if (!res.ok) throw new Error("Unable to update appointment");
  return res.json();
};
