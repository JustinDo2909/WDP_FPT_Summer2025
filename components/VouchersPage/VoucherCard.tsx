"use client";

import { Card, Row, Column, RText, Wrap } from "@/lib/by/Div";
import Link from "next/link";
import React from "react";

interface VoucherCardProps {
  readonly voucher: IVoucher;
}

const formatExpiryDate = (voucher: IVoucher) => {
  const expiry = new Date(
    new Date(voucher.created_at).getTime() + 2 * 24 * 60 * 60 * 1000,
  );
  return expiry.toLocaleDateString("vi-VN");
};

export default function VoucherCard({
  voucher,
}: VoucherCardProps): JSX.Element {
  const { discount_value, type, redeemed, redeemed_at, voucherProducts } =
    voucher;

  const isRedeemed = redeemed;
  const statusText = isRedeemed
    ? `Redeemed${redeemed_at ? ` at ${new Date(redeemed_at).toLocaleDateString()}` : ""}`
    : "Available";

  const formattedDiscount =
    type === "PERCENT"
      ? `${discount_value}% OFF`
      : `₫${discount_value.toLocaleString()} OFF`;

  return (
    <Card
      className={`
        flex w-full min-w-[450px] overflow-hidden rounded-lg border border-gray-200
        ${isRedeemed ? "opacity-50 cursor-not-allowed grayscale" : ""}
      `}
    >
      {/* Left Pill */}
      <Column className="flex flex-col items-center justify-center w-36 p-2 bg-pink-500 text-white text-center">
        <Wrap className="text-base font-bold">{formattedDiscount}</Wrap>
        <Wrap className="text-xs mt-1">Voucher</Wrap>
      </Column>

      {/* Right Content */}
      <Column className="flex flex-col flex-1 justify-between p-3 bg-white">
        <Column className="flex flex-col">
          <Row className="flex items-center justify-between">
            <RText className="text-base font-semibold text-gray-800">
              {formattedDiscount}
            </RText>
            <RText
              className={`text-xs font-medium ${
                isRedeemed ? "text-gray-400" : "text-green-600"
              }`}
            >
              {statusText}
            </RText>
          </Row>

          {/* Linked product titles */}
          {voucherProducts && voucherProducts.length > 0 && (
            <Wrap className="mt-2 text-xs text-gray-600">
              Applicable for:&nbsp;
              {voucherProducts.map((vp, index) => (
                <React.Fragment key={vp.product.id}>
                  <Link
                    href={`/products/${vp.product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {vp.product.title}
                  </Link>
                  {index < voucherProducts.length - 1 && ", "}
                </React.Fragment>
              ))}
            </Wrap>
          )}

          {/* <Wrap className="inline-block mt-2 px-2 py-0.5 bg-pink-500 text-white text-xs rounded w-fit">
            Stripe Coupon: {stripe_coupon_id ?? "N/A"}
          </Wrap> */}
        </Column>

        <Wrap className="text-xs text-gray-400 mt-2">
          Valid until {formatExpiryDate(voucher)}
        </Wrap>
      </Column>
    </Card>
  );
}
