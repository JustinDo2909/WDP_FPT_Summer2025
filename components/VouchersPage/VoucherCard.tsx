import { Card, Row, Column, RText } from "@/lib/by/Div";
import React from "react";

interface VoucherCardProps {
  readonly voucher: IVoucher;
}

export default function VoucherCard({ voucher }: VoucherCardProps): JSX.Element {
  const { id, discount_value, type, redeemed, redeemed_at, created_at, stripe_coupon_id } = voucher;

  let statusText = "Available";
  if (redeemed) {
    statusText = "Redeemed";
    if (redeemed_at) {
      statusText += ` at ${new Date(redeemed_at).toLocaleDateString()}`;
    }
  }

  return (
    <Card className="bg-white rounded shadow p-6 mb-4">
      <Row className="flex items-center justify-between mb-2">
        <RText className="font-semibold text-lg text-pink-600">
          {type === "PERCENT" ? `${discount_value}% OFF` : `₫${discount_value.toLocaleString()} OFF`}
        </RText>
        <RText className={`text-xs font-medium ${redeemed ? "text-gray-400" : "text-green-600"}`}>{statusText}</RText>
      </Row>
      <Column className="mt-2">
        <RText className="text-xs text-gray-500 mb-1">Voucher ID: {id}</RText>
        <RText className="text-xs text-gray-500 mb-1">Stripe Coupon: {stripe_coupon_id}</RText>
        <RText className="text-xs text-gray-400">Created: {new Date(created_at).toLocaleDateString()}</RText>
      </Column>
    </Card>
  );
}
