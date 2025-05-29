"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  formatCurrency,
  getTotalYearRevenue,
  calculateMonthlyGrowth,
} from "@/app/(admin)/dashboard/seg/utils";
import map from "lodash/map";
import { Area, Block, Section, Anchor } from "@/lib/by/Div/index";

export function OverviewCards() {
  const totalRevenue = getTotalYearRevenue();
  const revenueGrowth = calculateMonthlyGrowth();

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      gradient: "from-blue-500 to-blue-600",
      change: `+${revenueGrowth}% from last month`,
    },
    {
      title: "Orders",
      value: "1,234",
      icon: ShoppingCart,
      gradient: "from-green-500 to-green-600",
      change: "+8.2% from last week",
    },
    {
      title: "Customers",
      value: "8,945",
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
      change: "+156 new this week",
    },
    {
      title: "Reviews",
      value: "4.8",
      icon: Star,
      gradient: "from-pink-500 to-pink-600",
      change: "23 new reviews",
    },
  ];

  return (
    <Area className="grid gap-4 md:grid-cols-4">
      {map(cards, (card, index) => (
        <Section
          key={index}
          className={`bg-gradient-to-br ${card.gradient} text-white border-0 rounded-lg shadow-sm`}
        >
          <Anchor className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <h3 className="text-sm font-medium opacity-90">{card.title}</h3>
            <card.icon className="h-4 w-4 opacity-90" />
          </Anchor>
          <Anchor className="px-6 pb-6">
            <Block className="text-2xl font-bold">{card.value}</Block>
            <p className="text-xs opacity-90">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              {card.change}
            </p>
          </Anchor>
        </Section>
      ))}
    </Area>
  );
}
