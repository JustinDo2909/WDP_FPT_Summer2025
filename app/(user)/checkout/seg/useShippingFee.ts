'use client'

import { useEffect } from "react";
import { useGetShippingFeeMutation } from "@/process/api/apiGHN";
import { useCalculateFeeErrorHandler } from "./useCalculateFeeErrorHandler";


export function useShippingFeeHandler(shippingInfo: {
  to_district_id: string;
  to_ward_code: string;
}) {
  const [getShippingFee, { data: shippingFee, isLoading: feeLoading }] =
    useGetShippingFeeMutation();

  const {
    isRouteHasService,
    catchFeeCalculationError,
    serviceNotAvailableText,
  } = useCalculateFeeErrorHandler();

  useEffect(() => {
    const isReady =
      shippingInfo.to_district_id && shippingInfo.to_ward_code;

    if (!isReady) return;

    const payload = {
      service_type_id: 2,
      to_district_id: Number(shippingInfo.to_district_id),
      to_ward_code: shippingInfo.to_ward_code,
      weight: 100,
      items: [
      { name: "Sample Product A", quantity: 2 },
      { name: "Sample Product B", quantity: 1 },
      ],
    };

    catchFeeCalculationError(() => getShippingFee(payload).unwrap());
  }, [shippingInfo.to_district_id, shippingInfo.to_ward_code]);

  return {
    shippingFee,
    feeLoading,
    isRouteHasService,
    serviceNotAvailableText,
  };
}
