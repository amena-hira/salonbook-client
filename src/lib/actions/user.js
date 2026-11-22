import { protectedMutation } from "../core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

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
