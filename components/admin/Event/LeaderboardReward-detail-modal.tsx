"use client";

import { Area, RText, Yard, Container } from "@/lib/by/Div";
import {
  X,
  Trophy,
  Users,
  Calendar,
  Package,
  Percent,
  DollarSign,
} from "lucide-react";
import type { LeaderboardReward } from "@/types/event";

interface LeaderboardRewardDetailModalProps {
  reward: LeaderboardReward | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeaderboardRewardDetailModal({
  reward,
  isOpen,
  onClose,
}: LeaderboardRewardDetailModalProps) {
  if (!isOpen || !reward) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDiscountDisplay = (template: any) => {
    if (template.type === "PERCENT") {
      return `${template.discount_value}%`;
    } else {
      return `₫${template.discount_value.toLocaleString()}`;
    }
  };

  const getStatusColor = (reward: LeaderboardReward) => {
    return reward.is_active
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getStatusText = (reward: LeaderboardReward) => {
    return reward.is_active ? "Active" : "Inactive";
  };

  return (
    <Area
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      onClick={onClose}
    >
      <Container
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Area className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <RText className="text-xl font-semibold text-gray-900">
            Leaderboard Reward Details
          </RText>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </Area>

        {/* Content */}
        <Area className="flex-1 overflow-y-auto">
          <Area className="p-6 space-y-6">
            {/* Basic Info */}
            <Area className="bg-gray-50 rounded-lg p-4">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Reward ID
                  </RText>
                  <RText className="text-sm text-gray-900 font-mono">
                    {reward.id}
                  </RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Status
                  </RText>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      reward,
                    )}`}
                  >
                    {getStatusText(reward)}
                  </span>
                </Yard>
              </Area>
            </Area>

            {/* Reward Details */}
            <Area className="bg-blue-50 rounded-lg p-4">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Reward Details
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Title
                  </RText>
                  <RText className="text-lg font-bold text-gray-900">
                    {reward.title}
                  </RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Description
                  </RText>
                  <RText className="text-sm text-gray-900">
                    {reward.description}
                  </RText>
                </Yard>
              </Area>
            </Area>

            {/* Rank Range */}
            <Area className="bg-yellow-50 rounded-lg p-4">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Rank Range
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Rank From
                  </RText>
                  <Area className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <RText className="text-lg font-bold text-yellow-600">
                      {reward.rank_from}
                    </RText>
                  </Area>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Rank To
                  </RText>
                  <Area className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <RText className="text-lg font-bold text-yellow-600">
                      {reward.rank_to}
                    </RText>
                  </Area>
                </Yard>
              </Area>
            </Area>

            {/* Voucher Templates */}
            <Area className="bg-purple-50 rounded-lg p-4">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Voucher Templates ({reward.voucherTemplates.length})
              </RText>
              {reward.voucherTemplates.length > 0 ? (
                <Area className="space-y-4">
                  {reward.voucherTemplates.map((template, index) => (
                    <Area
                      key={template.id}
                      className="bg-white rounded-lg p-4 border border-purple-200"
                    >
                      <Area className="flex items-center justify-between mb-3">
                        <RText className="font-semibold text-gray-900">
                          Template {index + 1}
                        </RText>
                        <RText className="text-sm text-gray-500 font-mono">
                          ID: {template.id.slice(0, 8)}...
                        </RText>
                      </Area>

                      <Area className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Yard>
                          <RText className="text-sm font-medium text-gray-700 mb-1">
                            Discount
                          </RText>
                          <Area className="flex items-center gap-2">
                            {template.type === "PERCENT" ? (
                              <Percent className="w-4 h-4 text-blue-600" />
                            ) : (
                              <DollarSign className="w-4 h-4 text-green-600" />
                            )}
                            <RText className="text-lg font-bold text-green-600">
                              {getDiscountDisplay(template)}
                            </RText>
                          </Area>
                        </Yard>

                        <Yard>
                          <RText className="text-sm font-medium text-gray-700 mb-1">
                            User Limit
                          </RText>
                          <Area className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <RText className="text-sm text-gray-900">
                              {template.user_count} / {template.user_limit} used
                            </RText>
                          </Area>
                        </Yard>

                        <Yard>
                          <RText className="text-sm font-medium text-gray-700 mb-1">
                            Products
                          </RText>
                          <RText className="text-sm text-gray-900">
                            {template.voucherProducts.length} products
                          </RText>
                        </Yard>
                      </Area>

                      {/* Products List */}
                      {template.voucherProducts.length > 0 && (
                        <Area className="mt-3">
                          <RText className="text-sm font-medium text-gray-700 mb-2">
                            Applicable Products:
                          </RText>
                          <Area className="space-y-2">
                            {template.voucherProducts.map((vp) => (
                              <Area
                                key={vp.product.id}
                                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                              >
                                <Package className="w-4 h-4 text-purple-600" />
                                <RText className="text-sm text-gray-900">
                                  {vp.product.title}
                                </RText>
                              </Area>
                            ))}
                          </Area>
                        </Area>
                      )}
                    </Area>
                  ))}
                </Area>
              ) : (
                <Area className="text-center py-4">
                  <RText className="text-sm text-gray-500">
                    No voucher templates assigned to this reward
                  </RText>
                </Area>
              )}
            </Area>

            {/* Timestamps */}
            <Area className="bg-gray-50 rounded-lg p-4">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Timestamps
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Created At
                  </RText>
                  <Area className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <RText className="text-sm text-gray-900">
                      {formatDate(reward.created_at)}
                    </RText>
                  </Area>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Event ID
                  </RText>
                  <RText className="text-sm text-gray-900 font-mono">
                    {reward.event_id}
                  </RText>
                </Yard>
              </Area>
            </Area>
          </Area>
        </Area>

        {/* Footer */}
        <Area className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </Area>
      </Container>
    </Area>
  );
}
