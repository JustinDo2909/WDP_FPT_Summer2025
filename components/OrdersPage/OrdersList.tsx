import React from "react";
import OrderCard from "../OrdersPage/OrderCard";
import { Box } from "@/lib/by/Div";
import { orderBy } from "lodash"; // change from map to orderBy

export default function OrdersList({ orders }: { orders: IOrder[] }) {
  const sortedOrders = orderBy(orders, ["createdAt"], ["desc"]);

  return (
    <Box>
      {sortedOrders.map((order) => (
        <OrderCard key={order.id} order={order} onViewReciept={() => window.open(order.receipt_url, "_blank", "noopener,noreferrer")}/>
      ))}
    </Box>
  );
}
