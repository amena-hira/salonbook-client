const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const getAdminDashboardStats = async () => {
  const res = await fetch(`${BASE_URL}/admin/dashboard-stats`, {
    cache: "no-store",
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Unable to load dashboard statistics");
  }

  return result;
};
