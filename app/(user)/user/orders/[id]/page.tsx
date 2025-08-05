"use client";

import React from "react";
import { useParams } from "next/navigation";
import { TrackingSection } from "@/components/OrdersPage/TrackingSection";
import { ShippingSection } from "@/components/OrdersPage/ShippingSection";
import { OrderInfoSection } from "@/components/OrdersPage/OrderInfoSection";
import { Box, Row, RText } from "@/lib/by/Div";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useGetOrderByIdQuery } from "@/process/api/api";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : "";

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  if (!orderId) {
    return (
      <Box className="p-8 text-center text-red-500">Missing order ID.</Box>
    );
  }

  if (isLoading) {
    return <Box className="p-8 text-center">Loading order...</Box>;
  }

  if (isError || !order) {
    return <Box className="p-8 text-center text-red-500">Order not found.</Box>;
  }

  return (
    <Box className="w-full bg-white mx-auto py-4 space-y-6">
      <Row className="px-4 flex justify-between">
        <Link className="text-gray-700 flex" href="/user/orders">
          <ChevronLeft />
          <RText>Back</RText>
        </Link>
      </Row>
      {order.order && (
        <>
          <TrackingSection order={order.order} />
          <ShippingSection order={order.order} />
          <OrderInfoSection order={order.order} />
        </>
      )}
    </Box>
  );
}
