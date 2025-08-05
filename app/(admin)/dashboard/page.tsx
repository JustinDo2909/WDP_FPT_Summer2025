"use client";

import { useEffect, useState } from "react";
import { OverviewCards } from "@/components/admin/Dashboard/OverviewCards";
import { RevenueChart } from "@/components/admin/Dashboard/RevenueChart";
import { StatisticsSection } from "@/components/admin/Dashboard/StatisticSection";
import { TransactionsTable } from "@/components/admin/Dashboard/TransactionTable";
import { Area, Yard, RText, Core, Block } from "../../../lib/by/Div/index";

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [timeFilter, setTimeFilter] = useState("last_7_days");
  const [activeTab, setActiveTab] = useState("products");

  if (!isMounted) {
    return (
      <Core className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <header className="flex h-16 items-center gap-2 border-b bg-white px-4">
          <Yard className="flex items-center gap-2 text-sm text-gray-500">
            <RText>Dashboard</RText>
          </Yard>
        </header>

        {/* Loading Content */}
        <Area className="flex-1 space-y-6 p-6 overflow-auto">
          {/* Overview Cards Loading */}
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

          {/* Revenue Chart Loading */}
          <Core className="bg-white rounded-lg shadow-sm border">
            <Core className="p-6 border-b">
              <Block className="h-6 bg-gray-200 rounded w-32"></Block>
            </Core>
            <Yard className="p-6 animate-pulse">
              <Core className="h-80 bg-gray-200 rounded"></Core>
            </Yard>
          </Core>

          {/* Statistics Section Loading */}
          <Core className="bg-white rounded-lg shadow-sm border">
            <Core className="p-6 border-b">
              <Block className="h-6 bg-gray-200 rounded w-32"></Block>
            </Core>
            <Yard className="p-6 animate-pulse">
              <Core className="h-60 bg-gray-200 rounded"></Core>
            </Yard>
          </Core>

          {/* Transactions Loading */}
          <Core className="bg-white rounded-lg shadow-sm border">
            <Core className="p-6 border-b">
              <Block className="h-6 bg-gray-200 rounded w-32"></Block>
            </Core>
            <Yard className="p-6 animate-pulse">
              <Core className="h-60 bg-gray-200 rounded"></Core>
            </Yard>
          </Core>
        </Area>
      </Core>
    );
  }

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center gap-2 border-b bg-white px-4">
        <Yard className="flex items-center gap-2 text-sm text-gray-500">
          <RText>Dashboard</RText>
        </Yard>
      </header>

      {/* Main Content */}
      <Area className="flex-1 space-y-6 p-6 overflow-auto">
        <OverviewCards />
        <RevenueChart timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
        <StatisticsSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <TransactionsTable />
      </Area>
    </Core>
  );
}
