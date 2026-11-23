"use server";

import { authFetch } from "@/lib/core/server";

const BASE_URL =
  process.env.BACKEND_URL || "http://localhost:8000";

// Admin API: load payment transactions.
export const getTransactions = async () => {
  const res = await authFetch(`${BASE_URL}/transactions`);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Unable to load transactions");
  return result;
};
