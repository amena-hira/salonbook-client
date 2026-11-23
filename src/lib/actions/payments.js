import { protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.BACKEND_URL || "http://localhost:8000";

// Customer action: verify a completed Stripe Checkout payment.
export const verifyCheckoutPayment = async (sessionId) => {
  const res = await protectedMutation(
    `${BASE_URL}/payments/checkout-verify`,
    "POST",
    { sessionId },
  );
  const result = await res.json();

  if (
    !res.ok ||
    (!result.success && result.message !== "Payment already verified")
  ) {
    throw new Error(result.message || "Payment verification failed");
  }

  return result;
};
