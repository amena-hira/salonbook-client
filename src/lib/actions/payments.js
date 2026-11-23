const BASE_URL =
  process.env.BACKEND_URL || "http://localhost:8000";

// Customer action: verify a completed Stripe Checkout payment.
export const verifyCheckoutPayment = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
  const result = await res.json();

  if (
    !res.ok ||
    (!result.success && result.message !== "Payment already verified")
  ) {
    throw new Error(result.message || "Payment verification failed");
  }

  return result;
};
