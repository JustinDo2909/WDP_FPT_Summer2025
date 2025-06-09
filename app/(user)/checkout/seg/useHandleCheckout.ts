"use client";

import { useCreateCheckoutSessionMutation } from "@/process/api/apiOrders";
import { useCallback } from "react";

export const useHandleCheckout = () => {
  const [createCheckoutSession, { isLoading, error }] = useCreateCheckoutSessionMutation();

  const handleCheckout = useCallback(async (shippingCost: number, addressId: string) => {
    try {
      const response = await createCheckoutSession({ shippingCost, addressId }).unwrap();

      if (response.success && response.url) {
        window.location.href = response.url;
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Checkout failed", err);
    }
  }, [createCheckoutSession]);

  return { handleCheckout, isLoading, error };
};
