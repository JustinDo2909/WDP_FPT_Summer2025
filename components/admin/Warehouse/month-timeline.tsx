"use client";

import { Calendar, Package } from "lucide-react";
import { Area, RText, Yard } from "@/lib/by/Div";
import type { MonthGroup } from "@/components/admin/Warehouse/seg/utils";

interface MonthTimelineProps {
  monthGroups: MonthGroup[];
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
}

export function MonthTimeline({
  monthGroups,
  selectedMonth,
  onMonthSelect,
}: MonthTimelineProps) {
  return (
    <Yard>
      <Area className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <RText className="font-semibold text-gray-900">
          Warehouse Timeline
        </RText>
      </Area>
      <RText className="text-sm text-gray-500 mb-4">
        Select month to view details
      </RText>

      {monthGroups.length > 0 ? (
        <Yard className="space-y-2">
          {monthGroups.map((group) => (
            <button
              key={group.month}
              onClick={() => onMonthSelect(group.month)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedMonth === group.month
                  ? "bg-blue-100 border-blue-200 border"
                  : "hover:bg-gray-50"
              }`}
            >
              <Area className="flex items-center justify-between">
                <Yard>
                  <RText
                    className={`font-medium ${selectedMonth === group.month ? "text-blue-700" : "text-gray-900"}`}
                  >
                    {group.displayName}
                  </RText>
                  <RText
                    className={`text-sm ${selectedMonth === group.month ? "text-blue-600" : "text-gray-500"}`}
                  >
                    {group.totalBatches} batches
                  </RText>
                </Yard>

                <Package
                  className={`w-4 h-4 ${selectedMonth === group.month ? "text-blue-600" : "text-gray-400"}`}
                />
              </Area>
            </button>
          ))}
        </Yard>
      ) : (
        <Area className="p-8 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <RText className="text-gray-500">No batches found</RText>
        </Area>
      )}
    </Yard>
  );
}
