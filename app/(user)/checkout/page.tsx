"use client";

import CartSummary from "@/components/CartPage/CartSummary";
import GHNForm from "@/components/CheckoutPage/GHTKForm";
import Button from "@/components/CustomButton";
import { Box, Core, Row, RText, Section } from "@/lib/by/Div";
import { validateVietnamesePhoneNumber } from "@/lib/share/validateVNNumber";
import Link from "next/link";
import { useState } from "react";
import { useShippingFeeHandler } from "./seg/useShippingFee";

export default function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    province: "",
    district: "",
    ward: "",
    fullname: "",
    phone_number: "",
    street_address: "",
  });

  const {
    handleGetShippingFee,
    shippingFee,
    feeLoading,
    isRouteHasService,
    serviceNotAvailableText,
  } = useShippingFeeHandler(shippingInfo);

  const isFilled =
    shippingInfo.street_address &&
    shippingInfo.fullname &&
    validateVietnamesePhoneNumber(shippingInfo.phone_number) && 
    isRouteHasService;

  return (
    <Core className="p-4 md:p-8 min-h-screen ">
      <Row className="max-w-7xl w-full px-8 py-4">
        <h2 className="text-3xl tracking-wide font-bold ml-4 text-left">
          Checkout
        </h2>
      </Row>

      <Section className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <GHNForm
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
          getShippingFeeOnWardChange={handleGetShippingFee}
        />

        <Box className="">
          
          <CartSummary
            shippingLoading={feeLoading}
            subtotal={12000}
            shipping={shippingFee?.data?.total}
            total={12000}
            actionButton={
              <Link href="/checkout">
                <Button
                  disabled={!isFilled}
                  label={
                    <RText className="text-base whitespace-nowrap">
                      Pay with Stripe 
                    </RText>
                  }
                  className="flex-1 h-12 w-full flex bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg items-center justify-center text-sm"
                />
              </Link>
            }
          />
          {!isRouteHasService && (
            <p className="text-red-500 text-sm mb-4">
              {serviceNotAvailableText}
            </p>
          )}

        </Box>
      </Section>
    </Core>
  );
}
