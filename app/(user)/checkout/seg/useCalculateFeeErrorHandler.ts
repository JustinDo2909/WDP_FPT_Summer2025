'use client'

import { useState } from "react";

export function useCalculateFeeErrorHandler() {
  const [isRouteHasService, setIsRouteHasService] = useState(true);

  const catchFeeCalculationError = async (apiCall: () => Promise<any>) => {
    try {
      const result = await apiCall();
      setIsRouteHasService(true); // reset if success
      return result;
    } catch (error: any) {

      const message = error?.data?.message || error?.message || "";

      const isRouteError = message.includes("route not found service");

      setIsRouteHasService(!isRouteError);

      return null; // or throw error again if needed
    }
  };

  const serviceNotAvailableText =
    "Currently, there is no delivery service available for this route.";

  return {
    isRouteHasService,
    catchFeeCalculationError,
    serviceNotAvailableText,
  };
}
