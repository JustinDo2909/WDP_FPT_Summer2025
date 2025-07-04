"use client";

import CartSummary from "@/components/CartPage/CartSummary";
import AddressSelector from "@/components/CheckoutPage/AddressSelector";
import CouponAddInput from "@/components/CheckoutPage/CouponAddInput";
import Button from "@/components/CustomButton";
import { Box, Core, Row, RText, Section } from "@/lib/by/Div";
import { useGetAllVouchersQuery } from "@/process/api/api";
import { useGetCartQuery } from "@/process/api/apiCart";
import { useState } from "react";
import {
  calculateCartTotal,
  calculateCartTotalOriginalPrice,
} from "./seg/calculateSubtotal";
import { useHandleCheckout } from "./seg/useHandleCheckout";
import { useShippingFeeHandler } from "./seg/useShippingFee";

export default function CheckoutPage() {
  // const [shippingInfo, setShippingInfo] = useState<IAddress>({
  //   to_city_id: "",
  //   to_ward_code: "",
  //   city: "",
  //   district: "",
  //   ward: "",
  //   fullname: "",
  //   phone: "",
  //   address: "",
  //   user_id: "",
  //   pincode: "",
  //   notes: "",
  // });

  const [selectedAddress, setSelectedAddress] = useState<IAddress>();
  const [voucher, setVoucher] = useState<IVoucher>();

  const {
    shippingFee,
    feeLoading,
    isRouteHasService,
    serviceNotAvailableText,
  } = useShippingFeeHandler({
    to_district_id: selectedAddress?.to_city_id ?? "",
    to_ward_code: selectedAddress?.to_ward_code ?? "",
  });

  const { handleCheckout, isLoading } = useHandleCheckout();
  const { data: dataVouchers } = useGetAllVouchersQuery();

  const isFilled = selectedAddress && isRouteHasService;

  const { data: cartData } = useGetCartQuery();
  const cart = cartData?.cart;
  const cartItems = cart?.cartItems || [];
  const total = calculateCartTotal(cartItems);
  const subtotal = calculateCartTotalOriginalPrice(cartItems);

  return (
    <Core className="p-4 md:p-8 min-h-screen ">
      <Row className="max-w-7xl w-full px-8 py-4">
        <h2 className="text-3xl tracking-wide font-bold ml-4 text-left">
          Checkout
        </h2>
      </Row>

      <Section className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* <GHNForm
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
          getShippingFeeOnWardChange={handleGetShippingFee}
        /> */}
        <Box className="flex col-span-3 flex-col space-y-4">
          <CouponAddInput
            vouchers={dataVouchers?.vouchers}
            onSelect={setVoucher}
          />
          <AddressSelector
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </Box>

        <Box className="">
          <CartSummary
            shippingLoading={feeLoading}
            voucherApplied={voucher}
            shipping={shippingFee?.data?.total}
            total={total}
            subtotal={subtotal}
            actionButton={
              // <Link href="/checkout">
              <Button
                onClick={() => {
                  handleCheckout(
                    shippingFee.total ?? 0,
                    String(selectedAddress?.id),
                    voucher?.stripe_coupon_id ?? ""
                  );
                }}
                disabled={!isFilled || isLoading}
                label={
                  <RText className="flex items-center text-base font-bold leading-none whitespace-nowrap">
                    Pay with
                    <svg
                      width="60px"
                      height="80px"
                      viewBox="0 -11 70 70"
                      fill="none"
                      stroke="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M37.6109 16.2838L34.055 17.047V14.164L37.6109 13.415V16.2838ZM45.0057 17.8808C43.6173 17.8808..."
                        fill="white"
                      />
                    </svg>
                  </RText>
                }
                className="flex-1 h-12 w-full flex bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg items-center justify-center text-sm"
              />
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
