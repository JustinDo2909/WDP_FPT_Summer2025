"use client";

import CartSummary from "@/components/CartPage/CartSummary";
import AddressSelector from "@/components/CheckoutPage/AddressSelector";
import CouponAddInput from "@/components/CheckoutPage/CouponAddInput";
import Button from "@/components/CustomButton";
import { Box, Core, Row, RText, Section } from "@/lib/by/Div";
import { useGetUserVouchersQuery } from "@/process/api/api";
import { useState } from "react";
import {
  calculateCartTotal,
  calculateCartTotalOriginalPrice,
} from "./seg/calculateSubtotal";
import { useHandleCheckout } from "./seg/useHandleCheckout";
import { useShippingFeeHandler } from "./seg/useShippingFee";
import { roundDownToNearestMultiple } from "@/lib/share/roundTo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CartTable } from "@/components/CartPage/CartTable";
import { useGetCartQuery } from "@/process/api/apiCart";

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
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);

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
  const { data: dataVouchers } = useGetUserVouchersQuery();

  const isFilled = selectedAddress && isRouteHasService;
  const { data: cartData } = useGetCartQuery();
  const cart = cartData?.cart;
  const cartItems = cart?.cartItems || [];
  const total = calculateCartTotal(cartItems);
  const subtotal = calculateCartTotalOriginalPrice(cartItems);

  return (
    <Core className="p-4 md:p-8 min-h-screen ">
      <Row className="max-w-7xl w-full px-8 py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/checkout/cart" },
            { label: "Checkout" },
          ]}
        />
        <h2 className="text-3xl tracking-wide font-bold ml-4 text-left">
          Checkout
        </h2>
      </Row>

      <Section className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-10">
        {/* <GHNForm
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
          getShippingFeeOnWardChange={handleGetShippingFee}
        /> */}
        <Box className="flex col-span-3 flex-col space-y-4">
          <AddressSelector
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          <h2 className="text-xl font-bold">2. Order Summary</h2>

          <CartTable items={cartItems} isSimple={true} voucher={voucher} />

          <CouponAddInput
            vouchers={dataVouchers?.vouchers}
            setVoucherDiscount={setVoucherDiscount}
            onSelect={setVoucher}
            cartItems={cartItems}
          />
        </Box>

        <Box className="">
          <CartSummary
            shippingLoading={feeLoading}
            voucherDiscount={voucherDiscount}
            shipping={roundDownToNearestMultiple(
              shippingFee?.data?.total ?? 0,
              1000,
            )}
            total={total}
            subtotal={subtotal}
            actionButton={
              // <Link href="/checkout">
              <Button
                onClick={() => {
                  handleCheckout(
                    roundDownToNearestMultiple(
                      shippingFee?.data?.total,
                      1000,
                    ) ?? 0,
                    String(selectedAddress?.id),
                    voucher?.stripe_coupon_id ?? "",
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
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x={0.5}
                        y={0.5}
                        width={69}
                        height={47}
                        rx={5.5}
                        fill="none"
                        stroke="none"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M37.6109 16.2838L34.055 17.047V14.164L37.6109 13.415V16.2838ZM45.0057 17.8808C43.6173 17.8808 42.7248 18.5308 42.229 18.9831L42.0448 18.1069H38.9281V34.5849L42.4698 33.8359L42.484 29.8365C42.994 30.2039 43.7448 30.7268 44.9915 30.7268C47.5273 30.7268 49.8365 28.6918 49.8365 24.2119C49.8223 20.1136 47.4848 17.8808 45.0057 17.8808ZM44.1556 27.6177C43.3198 27.6177 42.8239 27.321 42.4839 26.9535L42.4698 21.7105C42.8381 21.3007 43.3481 21.0181 44.1556 21.0181C45.4448 21.0181 46.3373 22.4595 46.3373 24.3108C46.3373 26.2045 45.4589 27.6177 44.1556 27.6177ZM61 24.3532C61 20.7354 59.2433 17.8808 55.8858 17.8808C52.5142 17.8808 50.4742 20.7354 50.4742 24.325C50.4742 28.5787 52.8825 30.7268 56.3392 30.7268C58.025 30.7268 59.3 30.3452 60.2633 29.8082V26.9818C59.3 27.4623 58.195 27.7591 56.7925 27.7591C55.4183 27.7591 54.2 27.2786 54.0442 25.611H60.9717C60.9717 25.5332 60.9768 25.3565 60.9826 25.1528L60.9826 25.1526V25.1525V25.1524V25.1523V25.1523C60.9906 24.8753 61 24.5486 61 24.3532ZM54.0016 23.0107C54.0016 21.4138 54.9791 20.7496 55.8716 20.7496C56.7358 20.7496 57.6566 21.4138 57.6566 23.0107H54.0016ZM34.0548 18.121H37.6107V30.4866H34.0548V18.121ZM30.0176 18.121L30.2443 19.1668C31.0801 17.6405 32.7376 17.9514 33.1909 18.121V21.3714C32.7518 21.2159 31.3351 21.0181 30.4993 22.1063V30.4866H26.9576V18.121H30.0176ZM23.1607 15.0543L19.704 15.7892L19.6899 27.109C19.6899 29.2005 21.2624 30.7409 23.359 30.7409C24.5207 30.7409 25.3707 30.529 25.8382 30.2746V27.4058C25.3849 27.5895 23.1465 28.2396 23.1465 26.148V21.1311H25.8382V18.121H23.1465L23.1607 15.0543ZM14.7884 20.9475C14.0375 20.9475 13.5842 21.1594 13.5842 21.7106C13.5842 22.3124 14.3644 22.5771 15.3323 22.9055C16.9102 23.4409 18.9871 24.1455 18.9959 26.7557C18.9959 29.2854 16.97 30.741 14.0234 30.741C12.805 30.741 11.4733 30.5007 10.1558 29.9355V26.572C11.3458 27.2221 12.8475 27.7026 14.0234 27.7026C14.8167 27.7026 15.3834 27.4906 15.3834 26.8405C15.3834 26.174 14.5376 25.8693 13.5166 25.5015C11.9616 24.9413 10 24.2346 10 21.8802C10 19.3788 11.9125 17.8808 14.7884 17.8808C15.9642 17.8808 17.1259 18.0645 18.3017 18.5309V21.8519C17.225 21.2725 15.865 20.9475 14.7884 20.9475Z"
                        fill="white"
                      />
                    </svg>
                  </RText>
                }
                className="flex-1 h-12 w-full flex bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg items-center justify-center text-sm"
              />
              // </Link>
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
