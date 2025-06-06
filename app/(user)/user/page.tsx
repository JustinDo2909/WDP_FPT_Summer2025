import React from "react";
import UserSidebar from "../../../components/UserPage/UserSidebar";
import UserLayout from "../../../components/UserPage/UserLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../lib/pattern/share/Tabs";
import Link from "next/link";

export default function UserPage() {
  return (
    <UserLayout>
      <div className="flex">
        <div className="hidden md:block">
          <UserSidebar />
        </div>
        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList >
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="to-ship">Shipping</TabsTrigger>
              <TabsTrigger value="to-receive">To Receive</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              <TabsTrigger value="returns">Returns/Refunds</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="mt-6 text-center text-gray-500">
                <p>Welcome to your account dashboard!</p>
                <p className="mt-2">View your <Link href="/user/orders" className="text-pink-600 underline">orders</Link> or manage your profile.</p>
              </div>
            </TabsContent>
            {/* Other tab contents can be filled in as needed */}
          </Tabs>
        </div>
      </div>
    </UserLayout>
  );
}
