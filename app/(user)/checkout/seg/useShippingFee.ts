'use client'

import { useGetShippingFeeMutation } from "@/process/api/apiGHN";
import { mockCartItems } from "@/components/CartPage/seg/useCart";
import { useCalculateFeeErrorHandler } from "./useCalculateFeeErrorHandler";

const items = mockCartItems;

export function useShippingFeeHandler(shippingInfo: {
  province: string;
  ward: string;
}) {
  const [getShippingFee, { data: shippingFee, isLoading: feeLoading }] =
    useGetShippingFeeMutation();

  const {
    isRouteHasService,
    catchFeeCalculationError,
    serviceNotAvailableText,
  } = useCalculateFeeErrorHandler();

  const handleGetShippingFee = () => {
    const payload = {
      service_id: 53320,
      service_type_id: 2,
      to_district_id: Number(shippingInfo.province),
      to_ward_code: shippingInfo.ward,
      weight: 100,
      items: items.cart_items.map((item) => ({
        name: item.product.title,
        quantity: item.quantity,
      })),
    };

    catchFeeCalculationError(() => getShippingFee(payload).unwrap());
  };

  return {
    handleGetShippingFee,
    shippingFee,
    feeLoading,
    isRouteHasService,
    serviceNotAvailableText,
  };
}
