import { protectedMutation } from "../core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

//   admin & customer part
export const updateProfile = async (email, data) => {
  if (!email) throw new Error("Email is required");

  const res = await protectedMutation(
    `${BASE_URL}/update-profile?email=${encodeURIComponent(email)}`,
    "PATCH",
    data,
  );
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Unable to update profile");
  }

  return result;
};

// admin part

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`, { cache: "no-store" });
  if (!res.ok) throw new Error("Unable to load users");
  return res.json();
};

export const updateUserBlockStatus = async (userId, isBlocked) => {
  const res = await protectedMutation(
    `${BASE_URL}/users/${userId}/block`,
    "PATCH",
    { isBlocked },
  );
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Unable to update user status");
  }

  return result;
};
