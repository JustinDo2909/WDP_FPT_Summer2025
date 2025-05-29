"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Dashboard/Sidebar";
import { OverviewCards } from "@/components/admin/Dashboard/OverviewCards";
import { RevenueChart } from "@/components/admin/Dashboard/RevenueChart";
import { getCurrentDate } from "@/app/(admin)/dashboard/seg/utils";
import { StatisticsSection } from "@/components/admin/Dashboard/StatisticSection";
import { TransactionsTable } from "@/components/admin/Dashboard/TransactionTable";
import { Menu } from "lucide-react";
import { Area, Yard, RText, Anchor, Block } from "../../../lib/by/Div/index";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("last_7_days");
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Area className="flex h-screen bg-gray-50">
      <Sidebar />

      <Yard className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-2 border-b bg-white px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Anchor className="flex items-center gap-2 text-sm text-gray-500">
            <RText>Dashboard</RText>
          </Anchor>
          <Anchor className="ml-auto flex items-center space-x-4">
            <Block className="text-sm text-gray-500">{getCurrentDate()}</Block>
          </Anchor>
        </header>

        <Block className="flex-1 space-y-6 p-6 overflow-auto">
          <OverviewCards />
          <RevenueChart timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
          <StatisticsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TransactionsTable />
        </Block>
      </Yard>
    </Area>
  );
}
