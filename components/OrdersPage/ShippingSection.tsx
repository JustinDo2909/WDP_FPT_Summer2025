import { Card, Column, RText, Section } from "@/lib/by/Div";
import React from "react";

interface ShippingSectionProps {
  order: IOrder;
}

export function ShippingSection({ order }: ShippingSectionProps) {
  const address = order.address;
  return (
    <Section className="mb-6">
      <Card className="p-4 bg-gray-50">
        <RText className="font-semibold mb-2">Shipping Address</RText>
        <Column className="mb-2 flex flex-col">
          {/* <RText className="text-sm font-medium">{address?.name}</RText> */}
          <RText className="text-xs text-gray-500">{address?.phone}</RText>
          <RText className="text-xs text-gray-500">{address?.address}</RText>
        </Column>
        <RText className="text-xs text-gray-400">
          Payment method:{" "}
          {order.payment_method === "cash_on_delivery"
            ? "Cash on delivery"
            : order.payment_method}
        </RText>
      </Card>
    </Section>
  );
}
