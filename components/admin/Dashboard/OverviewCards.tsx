"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";
import {
  formatCurrency,
  calculateDashboardStats,
} from "@/components/admin/Dashboard/seg/utils";
import { StatsCard } from "@/components/admin/StatsCard";
import { Area, Core, Yard, Block } from "@/lib/by/Div/index";
import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "@/process/api/api";
import { useGetAllUsersQuery } from "@/process/api/apiUser";
import { useGetProductsQuery } from "@/process/api/api";

export function OverviewCards() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // API queries
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery({
      page: 1,
      pageSize: 1000, // Get all products for count
    });

  // Calculate stats from API data
  const orders = ordersData?.orders || [];
  const users = usersData || [];
  const products = productsData?.products || [];

  const stats = calculateDashboardStats(orders, users, products);

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
      valueColor: "text-blue-600",
      change: `${stats.totalOrders} orders completed`,
    },
    {
      title: "Orders",
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
      valueColor: "text-green-600",
      change: `Total orders processed`,
    },
    {
      title: "Customers",
      value: stats.totalCustomers.toString(),
      icon: Users,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
      valueColor: "text-purple-600",
      change: `Registered customers`,
    },
    {
      title: "Products",
      value: stats.totalProducts.toString(),
      icon: Package,
      iconColor: "text-pink-600",
      iconBgColor: "bg-pink-50",
      valueColor: "text-pink-600",
      change: `Products in catalog`,
    },
  ];

  if (!isMounted) {
    return null;
  }

  // Show loading state
  if (ordersLoading || usersLoading || productsLoading) {
    return (
      <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Core
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border animate-pulse"
          >
            <Yard className="flex items-center justify-between">
              <Block>
                <Block className="h-4 bg-gray-200 rounded w-20 mb-2"></Block>
                <Block className="h-8 bg-gray-200 rounded w-16"></Block>
              </Block>
              <Block className="h-12 w-12 bg-gray-200 rounded-full"></Block>
            </Yard>
            <Block className="h-3 bg-gray-200 rounded w-24 mt-4"></Block>
          </Core>
        ))}
      </Area>
    );
  }

  return (
    <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          iconColor={card.iconColor}
          iconBgColor={card.iconBgColor}
          valueColor={card.valueColor}
          description={
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <TrendingUp className="h-3 w-3" />
              {card.change}
            </span>
          }
        />
      ))}
    </Area>
  );
}
