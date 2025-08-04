import { Card, Row, Column, RText, Section } from "@/lib/by/Div";
import React from "react";

interface TrackingSectionProps {
  order: IOrder;
}

const STATUS_FLOW = [
  { key: "PROCESSING", label: "Order Placed" },
  { key: "SHIPPED", label: "Shipped to Carrier" },
  { key: "DELIVERED", label: "Order Received" },
];

export function TrackingSection({ order }: TrackingSectionProps) {
  // If cancelled, show only cancelled
  if (order.status === "CANCELLED") {
    return (
      <Section className="mb-6">
        <Row className="flex justify-between items-center">
          <Column className="flex flex-col items-center flex-1">
            <Card className="rounded-full w-10 h-10 flex items-center justify-center bg-red-100 mb-2">
              <RText className="text-red-600 text-xl font-bold">✗</RText>
            </Card>
            <RText className="text-xs text-center font-medium text-red-700 mb-1">
              Order Cancelled
            </RText>
            <RText className="text-[10px] text-gray-400 text-center">
              {order.updatedAt
                ? new Date(order.updatedAt).toLocaleString()
                : "-"}
            </RText>
          </Column>
        </Row>
      </Section>
    );
  }

  // Find the current status index
  const currentIdx = STATUS_FLOW.findIndex((s) => s.key === order.status);
  // If status is not found, treat as none completed
  const completedIdx = currentIdx === -1 ? -1 : currentIdx;

  return (
    <Section className="mb-6">
      <Row className="flex justify-between items-center">
        {STATUS_FLOW.map((step, idx) => {
          const isCompleted = idx <= completedIdx;
          return (
            <Column
              key={step.key}
              className="flex flex-col items-center flex-1"
            >
              <Card
                className={`rounded-full w-10 h-10 flex items-center justify-center mb-2 ${
                  isCompleted ? "bg-green-100" : "bg-gray-200"
                }`}
              >
                <RText
                  className={`text-xl font-bold ${
                    isCompleted ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {idx + 1}
                </RText>
              </Card>
              <RText
                className={`text-xs text-center font-medium mb-1 ${
                  isCompleted ? "text-green-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </RText>
              <RText className="text-[10px] text-gray-400 text-center">
                {isCompleted
                  ? new Date(
                      idx === 0 ? order.createdAt : order.updatedAt,
                    ).toLocaleString()
                  : "-"}
              </RText>
            </Column>
          );
        })}
      </Row>
    </Section>
  );
}
