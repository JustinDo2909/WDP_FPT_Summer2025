import { Card, Row, Column, RText, Wrap } from "@/lib/by/Div";
import Image from "next/image";
import React from "react";

interface VoucherCardProps {
  readonly voucher: IVoucher;
}

export default function VoucherCard({
  voucher,
}: VoucherCardProps): JSX.Element {
  const {
    id,
    discount_value,
    type,
    redeemed,
    redeemed_at,
    created_at,
    stripe_coupon_id,
  } = voucher;

  let statusText = "Available";
  if (redeemed) {
    statusText = "Redeemed";
    if (redeemed_at) {
      statusText += ` at ${new Date(redeemed_at).toLocaleDateString()}`;
    }
  }

  let iconSrc = "/hot-sale.png";
  if (type === "AMOUNT") {
    iconSrc = "/low-cost.png";
  }

  return (
    <Card className="bg-white rounded shadow p-6 mb-4 flex flex-row items-center gap-4">
  {/* Logo on the left */}
  <Wrap className="w-16 h-16 relative flex-shrink-0">
    <Image
      src={iconSrc}
      alt="Voucher Icon"
      className="object-contain"
      fill
    />
  </Wrap>

  {/* Text on the right */}
  <Wrap className="flex flex-col flex-1">
    <Row className="flex items-center justify-between mb-2">
      <RText className="font-semibold text-lg text-pink-600">
        {type === "PERCENT"
          ? `${discount_value}% OFF`
          : `₫${discount_value.toLocaleString()} OFF`}
      </RText>
      <RText
        className={`text-xs font-medium ${redeemed ? "text-gray-400" : "text-green-600"}`}
      >
        {statusText}
      </RText>
    </Row>

    <Column className="">
      <RText className="text-xs text-gray-500 mb-1">Voucher ID: {id}</RText>
      <RText className="text-xs text-gray-500 mb-1">
        Stripe Coupon: {stripe_coupon_id}
      </RText>
      <RText className="text-xs text-gray-400">
        Created: {new Date(created_at).toLocaleDateString()}
      </RText>
    </Column>
  </Wrap>
</Card>

  );
}
