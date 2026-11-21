const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const getLimitServices = async (query = "") => {
  const res = await fetch(`${BASE_URL}/services?${query}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Unable to load services");
  }
  return await res.json();
};
