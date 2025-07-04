'use client'

import OrdersList from "../../../../components/OrdersPage/OrdersList";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../lib/pattern/share/Tabs";
import { OrdersSearch } from "@/components/OrdersPage/OrdersSearch";
import { Box } from "@/lib/by/Div";
import { useGetOrdersQuery } from "@/process/api/apiOrders";

export default function OrdersPage() {
  const {data, isLoading } = useGetOrdersQuery();
  const orders = data?.orders

  return (
      <Box className="flex-1">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            <TabsTrigger value="returns">Returns/Refunds</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <OrdersSearch />
            {!isLoading && <OrdersList orders={orders} /> }
          </TabsContent>
        </Tabs>
      </Box>
  );
}
