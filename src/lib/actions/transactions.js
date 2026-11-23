const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const getTransactions = async () => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    cache: "no-store",
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Unable to load transactions");
  }

  return result;
};

export const verifyCheckoutPayment = async (sessionId) => {
    console.log("session id: ", sessionId);
  const res = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId }),
    cache: "no-store",
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
