"use client";

import { Package, TrendingUp, AlertTriangle } from "lucide-react";
import { Area, RText, Yard } from "@/lib/by/Div";
import { StatsCard } from "@/components/admin/StatsCard";

interface WarehouseStatsProps {
  stats: {
    totalBatches: number;
    activeBatches: number;
    expiredBatches: number;
    outOfStockBatches?: number;
    totalStock: number;
    totalQuantity: number;
    stockPercentage: number;
  } | null;
  monthName: string;
}

export function WarehouseStats({ stats, monthName }: WarehouseStatsProps) {
  if (!stats) return null;

  return (
    <Yard className="space-y-4">
      {/* Header */}
      <Area className="flex items-center justify-between">
        <Yard>
          <RText className="text-xl font-bold text-gray-900">{monthName}</RText>
          <RText className="text-sm text-gray-500">
            Monthly batch overview
          </RText>
        </Yard>

        <Yard className="text-right">
          <RText className="text-sm text-gray-500">Stock Ratio</RText>
          <RText
            className={`text-lg font-bold ${
              stats.stockPercentage > 70
                ? "text-green-600"
                : stats.stockPercentage > 40
                  ? "text-yellow-600"
                  : "text-red-600"
            }`}
          >
            {stats.stockPercentage}%
          </RText>
        </Yard>
      </Area>

      {/* Stats Cards */}
      <Yard className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Batches"
          value={stats.totalBatches}
          icon={Package}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          valueColor="text-blue-700"
        />
        <StatsCard
          title="Active"
          value={stats.activeBatches}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          valueColor="text-green-700"
        />
        <StatsCard
          title="Expired"
          value={stats.expiredBatches}
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
          valueColor="text-red-700"
        />
      </Yard>

      {/* Stock Summary */}
      <Yard className="bg-white rounded-lg border border-gray-200 p-4">
        <RText className="font-medium text-gray-900 mb-3">Stock Summary</RText>
        <Area className="flex items-center justify-between mb-2">
          <RText className="text-sm text-gray-600">Total Received</RText>
          <RText className="font-medium">
            {stats.totalQuantity.toLocaleString()}
          </RText>
        </Area>
        <Area className="flex items-center justify-between mb-2">
          <RText className="text-sm text-gray-600">Remaining</RText>
          <RText className="font-medium">
            {stats.totalStock.toLocaleString()}
          </RText>
        </Area>
        <Area className="flex items-center justify-between">
          <RText className="text-sm text-gray-600">Sold</RText>
          <RText className="font-medium">
            {(stats.totalQuantity - stats.totalStock).toLocaleString()}
          </RText>
        </Area>

        {/* Progress Bar */}
        <Yard className="mt-3">
          <Yard className="w-full bg-gray-200 rounded-full h-2">
            <Yard
              className={`h-2 rounded-full transition-all ${
                stats.stockPercentage > 70
                  ? "bg-green-500"
                  : stats.stockPercentage > 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${stats.stockPercentage}%` }}
            />
          </Yard>
        </Yard>
      </Yard>
    </Yard>
  );
}
