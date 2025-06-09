import React from "react";
import UserLayout from "../../../../components/UserPage/UserLayout";
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
  return (
    <UserLayout>
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
            <OrdersList />
          </TabsContent>
          {/* Other tab contents can be filtered as needed */}
        </Tabs>
      </Box>
    </UserLayout>
  );
}
