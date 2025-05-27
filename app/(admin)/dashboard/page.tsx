"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Dashboard/Sidebar";
import { OverviewCards } from "@/components/admin/Dashboard/OverviewCards";
import { RevenueChart } from "@/components/admin/Dashboard/RevenueChart";
import { getCurrentDate } from "@/app/(admin)/dashboard/seg/utils";
import { Menu } from "lucide-react";
import { Area, Yard, Section, Anchor, Block } from "../../../lib/by/Div/index";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("last_7_days");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-2 border-b bg-white px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="text-sm text-gray-500">{getCurrentDate()}</div>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6 overflow-auto">
          {/* Hàng 1: Overview Cards */}
          <OverviewCards />

          {/* Hàng 2: Revenue Chart */}
          <RevenueChart timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
        </div>
      </div>
    </div>
  );
}
