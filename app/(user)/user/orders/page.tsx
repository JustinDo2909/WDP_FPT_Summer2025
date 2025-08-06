"use client";

import { useGetOrdersQuery } from "@/process/api/apiOrders";
import OrdersList from "../../../../components/OrdersPage/OrdersList";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../lib/pattern/share/Tabs";
import { OrdersSearch } from "@/components/OrdersPage/OrdersSearch";
import { Box } from "@/lib/by/Div";

export default function OrdersPage() {
  const { data, isLoading } = useGetOrdersQuery();
  const orders = data?.orders || [];

  // Helper to filter orders by status
  const filterOrders = (status: string) =>
    status === "all"
      ? orders
      : orders.filter((order: IOrder) => order.status.toLowerCase() === status);

  return (
    <Box className="flex-1">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <OrdersSearch />
          {!isLoading && <OrdersList orders={filterOrders("all")} />}
        </TabsContent>
        <TabsContent value="processing">
          <OrdersSearch />
          {!isLoading && <OrdersList orders={filterOrders("processing")} />}
        </TabsContent>
        <TabsContent value="shipped">
          <OrdersSearch />
          {!isLoading && <OrdersList orders={filterOrders("shipped")} />}
        </TabsContent>
        <TabsContent value="delivered">
          <OrdersSearch />
          {!isLoading && <OrdersList orders={filterOrders("delivered")} />}
        </TabsContent>
        <TabsContent value="cancelled">
          <OrdersSearch />
          {!isLoading && <OrdersList orders={filterOrders("cancelled")} />}
        </TabsContent>
      </Tabs>
    </Box>
  );
}
