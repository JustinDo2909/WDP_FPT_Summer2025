import React from "react";
import OrderCard from "../OrdersPage/OrderCard";
import { Box } from "@/lib/by/Div";
import { map } from "lodash";

export default function OrdersList({orders}:{orders: IOrder[]}) {
  return (
    <Box>
      {map(orders, (order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Box>
  );
}
