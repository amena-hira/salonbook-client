"use server";

import { authFetch } from "@/lib/core/server";

const BASE_URL =
  process.env.API_BASE_URL || "http://localhost:8000";

// Admin API: load dashboard statistics.
export const getAdminDashboardStats = async () => {
  const res = await authFetch(`${BASE_URL}/admin/dashboard-stats`);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Unable to load dashboard statistics");
  }
  return result;
};
