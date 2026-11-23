"use server";

import { authFetch, protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Both API: load service categories.
export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Unable to load categories");
  return res.json();
};

// Both API: load public services and filters.
export const getServices = async (query = "") => {
  const res = await fetch(`${BASE_URL}/services?${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Unable to load services");
  return res.json();
};

// Both API: load one protected service.
export const getServiceById = async (serviceId) => {
  const res = await authFetch(`${BASE_URL}/services/${serviceId}`);
  if (!res.ok) throw new Error("Unable to load service");
  return res.json();
};

// Admin API: create a service.
export const addNewService = async (data) => {
  const res = await protectedMutation(`${BASE_URL}/services`, "POST", data);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Unable to create service");
  return result;
};

// Admin API: update a service.
export const updateService = async (serviceId, data) => {
  const res = await protectedMutation(
    `${BASE_URL}/services/${serviceId}`,
    "PATCH",
    data,
  );
  if (!res.ok) throw new Error("Unable to update service");
  return res.json();
};

// Admin API: load one service for editing.
export const getService = async (serviceId) => {
  const res = await authFetch(`${BASE_URL}/admin/service/${serviceId}`);
  if (!res.ok) throw new Error("Unable to load service");
  return res.json();
};

// Admin API: load all services, including inactive services.
export const getAllServices = async () => {
  const res = await authFetch(`${BASE_URL}/admin/services`);
  if (!res.ok) throw new Error("Unable to load services");
  return res.json();
};

// Admin API: delete a service.
export const deleteService = async (serviceId) => {
  const res = await protectedMutation(`${BASE_URL}/services/${serviceId}`, "DELETE");
  if (!res.ok) throw new Error("Unable to delete service");
  return res.json();
};
