"use server";

import { authFetch, protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Both API: update the signed-in user's profile.
export const updateProfile = async (email, data) => {
  if (!email) throw new Error("Email is required");

  const res = await protectedMutation(
    `${BASE_URL}/update-profile?email=${email}`,
    "PATCH",
    data,
  );
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Unable to update profile");
  return result;
};

// Admin API: load all users.
export const getUsers = async () => {
  const res = await authFetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Unable to load users");
  return res.json();
};

// Admin API: block or unblock a user.
export const updateUserBlockStatus = async (userId, isBlocked) => {
  const res = await protectedMutation(
    `${BASE_URL}/users/${userId}/block`,
    "PATCH",
    { isBlocked },
  );
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Unable to update user status");
  return result;
};
