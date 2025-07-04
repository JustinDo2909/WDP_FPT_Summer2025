"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  formatCurrency,
  formatCurrencyShort,
  calculateMonthlyRevenue,
} from "@/components/admin/Dashboard/seg/utils";
import { MoreHorizontal } from "lucide-react";
import { TooltipProps } from "@/types/dashboard/index";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div/index";
import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "@/process/api/api";

interface RevenueChartProps {
  timeFilter: string;
  setTimeFilter: (value: string) => void;
}

export function RevenueChart({}: RevenueChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // API query
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery();

  // Calculate monthly revenue from API data
  const orders = ordersData?.orders || [];
  const data = calculateMonthlyRevenue(orders);

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.hasData && data.revenue > 0) {
        return (
          <Core className="bg-white p-3 border rounded-lg shadow-lg">
            <p className="font-medium">{`${label}: ${formatCurrency(data.revenue)}`}</p>
          </Core>
        );
      }
    }
    return null;
  };

  // Show loading state for both mounting and data loading
  if (!isMounted || ordersLoading) {
    return (
      <Core className="bg-white rounded-lg shadow-sm border">
        <Container className="p-6 border-b">
          <Area className="flex items-center justify-between">
            <Yard>
              <RText className="text-lg font-semibold mb-1">
                Monthly Sales
              </RText>
            </Yard>
          </Area>
        </Container>
        <Yard className="p-6 animate-pulse">
          <Core className="h-80 bg-gray-200 rounded"></Core>
        </Yard>
      </Core>
    );
  }

  return (
    <Core className="bg-white rounded-lg shadow-sm border">
      <Container className="p-6 border-b">
        <Area className="flex items-center justify-between">
          <Yard>
            <RText className="text-lg font-semibold mb-1">Monthly Sales</RText>
          </Yard>
          <Yard className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </button>
          </Yard>
        </Area>
      </Container>
      <Yard className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrencyShort(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </Yard>
    </Core>
  );
}
