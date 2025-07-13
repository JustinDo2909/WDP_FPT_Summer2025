'use client'

import { useEffect } from "react";
import { useGetShippingFeeMutation } from "@/process/api/apiGHN";
import { mockCartItems } from "@/components/CartPage/seg/useCart";
import { useCalculateFeeErrorHandler } from "./useCalculateFeeErrorHandler";

const items = mockCartItems;

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
      service_id: 53320,
      service_type_id: 2,
      to_district_id: Number(shippingInfo.to_district_id),
      to_ward_code: shippingInfo.to_ward_code,
      weight: 100,
      items: items.cartItems.map((item) => ({
        name: item.product.title,
        quantity: item.quantity,
      })),
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
