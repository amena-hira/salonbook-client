import { protectedMutation } from "../core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Unable to load categories");
  }
  return await res.json();
};

export const getServices = async (query = "") => {
  const res = await fetch(`${BASE_URL}/services?${query}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Unable to load services");
  }
  return await res.json();
};

export const getServiceById = async (serviceId) => {
  const res = await fetch(`${BASE_URL}/services/${serviceId}`);
  return res.json();
};

export const addNewService = async (data) => {
  const api = `${BASE_URL}/services`;
  const res = await protectedMutation(api, "POST", data);
  return res.json();
};

// Admin part
export const updateService = async (id, data) => {
  const api = `${BASE_URL}/services/${id}`;
  const res = await protectedMutation(api, "PATCH", data);
  if (!res.ok) throw new Error("Unable to update service");
  return res.json();
};

export const getService = async (serviceId) => {
  const res = await fetch(`${BASE_URL}/admin/service/${serviceId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Unable to load service");
  return res.json();
}

export const getAllServices = async () => {
  const res = await fetch(`${BASE_URL}/admin/services`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Unable to load service");
  return res.json();
};


export const deleteService = async (serviceId) => {
  const res = await protectedMutation(`${BASE_URL}/services/${serviceId}`, "DELETE");
  if (!res.ok) throw new Error("Unable to delete service");
  return res.json();
};
