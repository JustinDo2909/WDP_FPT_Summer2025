import { Card, Row, Column, RText, Section } from "@/lib/by/Div";
import React from "react";

interface TrackingSectionProps {
  order: IOrder;
}

export function TrackingSection({ order }: TrackingSectionProps) {
  // Example: status timeline, timestamps, etc.
  // You can expand this logic as needed
  const statusSteps = [
    { label: "Order Placed", time: order.createdAt },
    { label: "Payment Info Confirmed", time: order.createdAt },
    { label: "Shipped to Carrier", time: order.createdAt },
    { label: "Order Received", time: order.updatedAt },
    { label: "Order Completed", time: order.updatedAt },
  ];
  return (
    <Section className="mb-6">
      <Row className="flex justify-between items-center">
        {statusSteps.map((step, idx) => (
          <Column key={idx} className="flex flex-col items-center flex-1">
            <Card className="rounded-full w-10 h-10 flex items-center justify-center bg-green-100 mb-2">
              <RText className="text-green-600 text-xl font-bold">{idx + 1}</RText>
            </Card>
            <RText className="text-xs text-center font-medium text-green-700 mb-1">{step.label}</RText>
            <RText className="text-[10px] text-gray-400 text-center">{step.time ? new Date(step.time).toLocaleString() : "-"}</RText>
          </Column>
        ))}
      </Row>
    </Section>
  );
}
