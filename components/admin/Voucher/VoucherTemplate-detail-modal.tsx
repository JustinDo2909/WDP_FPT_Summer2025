"use client";

import { Area, RText, Yard, Container } from "@/lib/by/Div";
import { X, Users, Calendar, Package, Percent, DollarSign } from "lucide-react";
import type { VoucherTemplate } from "@/types/voucher/index";

interface VoucherTemplateDetailModalProps {
  voucherTemplate: VoucherTemplate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VoucherTemplateDetailModal({
  voucherTemplate,
  isOpen,
  onClose,
}: VoucherTemplateDetailModalProps) {
  if (!isOpen || !voucherTemplate) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDiscountDisplay = (template: VoucherTemplate) => {
    if (template.type === "PERCENT") {
      return `${template.discount_value}%`;
    } else {
      return `₫${template.discount_value.toLocaleString()}`;
    }
  };

  const getStatusColor = (template: VoucherTemplate) => {
    return template.is_active
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getStatusText = (template: VoucherTemplate) => {
    return template.is_active ? "Active" : "Inactive";
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
            Voucher Template Details
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
                    Template ID
                  </RText>
                  <RText className="text-sm text-gray-900 font-mono">
                    {voucherTemplate.id}
                  </RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Status
                  </RText>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      voucherTemplate,
                    )}`}
                  >
                    {getStatusText(voucherTemplate)}
                  </span>
                </Yard>
              </Area>
            </Area>

            {/* Discount Details */}
            <Area className="bg-blue-50 rounded-lg p-4">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Discount Details
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Discount Type
                  </RText>
                  <Area className="flex items-center gap-2">
                    {voucherTemplate.type === "PERCENT" ? (
                      <Percent className="w-4 h-4 text-blue-600" />
                    ) : (
                      <DollarSign className="w-4 h-4 text-green-600" />
                    )}
                    <RText className="text-sm text-gray-900">
                      {voucherTemplate.type === "PERCENT"
                        ? "Percentage"
                        : "Fixed Amount"}
                    </RText>
                  </Area>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Discount Value
                  </RText>
                  <RText className="text-lg font-bold text-green-600">
                    {getDiscountDisplay(voucherTemplate)}
                  </RText>
                </Yard>
              </Area>
            </Area>

            {/* Usage Limits */}
            <Area className="bg-yellow-50 rounded-lg p-4">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Usage Limits
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    User Limit
                  </RText>
                  <Area className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-600" />
                    <RText className="text-sm text-gray-900">
                      {voucherTemplate.user_count} /{" "}
                      {voucherTemplate.user_limit} used
                    </RText>
                  </Area>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Vouchers Generated
                  </RText>
                  <RText className="text-sm text-gray-900">
                    {voucherTemplate._count.vouchers} vouchers
                  </RText>
                </Yard>
              </Area>
            </Area>

            {/* Products (Only for PERCENT type) */}
            {voucherTemplate.type === "PERCENT" && (
              <Area className="bg-purple-50 rounded-lg p-4">
                <RText className="text-lg font-semibold text-gray-900 mb-4">
                  Applicable Products
                </RText>
                {voucherTemplate.voucherProducts.length > 0 ? (
                  <Area className="space-y-3">
                    {voucherTemplate.voucherProducts.map((vp) => (
                      <Area
                        key={vp.product.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200"
                      >
                        <Area className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-purple-600" />
                          <Yard>
                            <RText className="text-sm font-medium text-gray-900">
                              {vp.product.title}
                            </RText>
                            <RText className="text-xs text-gray-500">
                              ID: {vp.product.id}
                            </RText>
                          </Yard>
                        </Area>
                        <RText className="text-sm text-gray-600">
                          ₫
                          {vp.product.sale_price
                            ? vp.product.sale_price.toLocaleString()
                            : vp.product.price.toLocaleString()}
                        </RText>
                      </Area>
                    ))}
                  </Area>
                ) : (
                  <Area className="text-center py-4">
                    <RText className="text-sm text-gray-500">
                      No products assigned to this template
                    </RText>
                  </Area>
                )}
              </Area>
            )}

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
                      {formatDate(voucherTemplate.created_at)}
                    </RText>
                  </Area>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Last Updated
                  </RText>
                  <Area className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <RText className="text-sm text-gray-900">
                      {formatDate(voucherTemplate.updated_at)}
                    </RText>
                  </Area>
                </Yard>
              </Area>
            </Area>

            {/* Additional Info */}
            <Area className="bg-indigo-50 rounded-lg p-4">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Event ID
                  </RText>
                  <RText className="text-sm text-gray-900 font-mono">
                    {voucherTemplate.event_id}
                  </RText>
                </Yard>
                <Yard>
                  <RText className="text-sm font-medium text-gray-700 mb-1">
                    Leaderboard Reward ID
                  </RText>
                  <RText className="text-sm text-gray-900 font-mono">
                    {voucherTemplate.leaderboard_reward_id || "Not assigned"}
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
