import { Card, RText, Section } from "@/lib/by/Div";
import React from "react";
import OrderCard from "./OrderCard";

interface OrderInfoSectionProps {
  order: IOrder;
}

export function OrderInfoSection({ order }: OrderInfoSectionProps) {
  return (
    <Section>
      <Card className="p-4">
        <RText className="font-semibold mb-2">Order Information</RText>
        <OrderCard order={order} />
        {/* <Row className="flexjustify-between mt-4 border-t pt-2">
          <RText className="text-gray-700 font-medium">Total:</RText>
          <RText className="text-pink-600 font-semibold">₫{order.total_amount.toLocaleString()}</RText>
        </Row> */}
      </Card>
    </Section>
  );
}
