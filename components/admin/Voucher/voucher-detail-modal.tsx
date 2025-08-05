"use client";

import { VoucherDisplay } from "@/types/voucher/index";
import {
  getDiscountDisplay,
  getStatusColor,
  formatDate,
} from "@/components/admin/Voucher/seg/utils";
import { Area, RText, Yard, Container } from "@/lib/by/Div";
import { X, Ticket, User, Award, Calendar, CreditCard } from "lucide-react";

interface VoucherDetailModalProps {
  voucher: VoucherDisplay | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VoucherDetailModal({
  voucher,
  isOpen,
  onClose,
}: VoucherDetailModalProps) {
  if (!isOpen || !voucher) return null;

  return (
    <Area className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Container className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <Area className="flex items-center justify-between p-6 border-b border-gray-200">
          <Area className="flex items-center gap-3">
            <Area className="p-2 bg-purple-100 rounded-lg">
              <Ticket className="w-6 h-6 text-purple-600" />
            </Area>
            <Yard>
              <RText className="text-xl font-bold text-gray-900">
                Voucher Details
              </RText>
              <RText className="text-sm text-gray-500">ID: {voucher.id}</RText>
            </Yard>
          </Area>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </Area>

        {/* Content */}
        <Area className="p-6">
          <Area className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <Area className="space-y-4">
              <RText className="text-lg font-semibold text-gray-900 border-b pb-2">
                Basic Information
              </RText>

              <Area className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <Yard>
                  <RText className="text-sm text-gray-500">
                    Stripe Coupon ID
                  </RText>
                  <RText className="font-mono text-sm text-gray-900">
                    {voucher.stripe_coupon_id}
                  </RText>
                </Yard>
              </Area>

              <Area className="flex items-center gap-3">
                <User className="w-5 h-5 text-green-600" />
                <Yard>
                  <RText className="text-sm text-gray-500">User ID</RText>
                  <RText className="font-mono text-sm text-gray-900">
                    {voucher.user_id}
                  </RText>
                </Yard>
              </Area>

              <Area className="flex items-center gap-3">
                <Award className="w-5 h-5 text-yellow-600" />
                <Yard>
                  <RText className="text-sm text-gray-500">
                    Event Reward ID
                  </RText>
                  <RText className="font-mono text-sm text-gray-900">
                    {voucher.voucherTemplate?.leaderboard_reward_id || "N/A"}
                  </RText>
                </Yard>
              </Area>
            </Area>

            {/* Discount Info */}
            <Area className="space-y-4">
              <RText className="text-lg font-semibold text-gray-900 border-b pb-2">
                Discount Information
              </RText>

              <Area>
                <RText className="text-sm text-gray-500 mb-1">
                  Discount Value
                </RText>
                <RText className="text-2xl font-bold text-green-600">
                  {getDiscountDisplay(voucher)}
                </RText>
                <RText className="text-xs text-gray-500 capitalize mt-1">
                  {voucher.type === "PERCENT"
                    ? "Percentage Discount"
                    : "Fixed Amount"}
                </RText>
              </Area>

              <Area>
                <RText className="text-sm text-gray-500 mb-1">Status</RText>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(voucher)}`}
                >
                  {voucher.statusText}
                </span>
              </Area>
            </Area>
          </Area>

          {/* Dates */}
          <Area className="mt-6 pt-6 border-t border-gray-200">
            <RText className="text-lg font-semibold text-gray-900 mb-4">
              Timeline
            </RText>
            <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Area className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <Yard>
                  <RText className="text-sm text-gray-500">Created At</RText>
                  <RText className="text-sm font-medium text-gray-900">
                    {voucher.formattedCreatedAt}
                  </RText>
                </Yard>
              </Area>

              {voucher.redeemed_at && (
                <Area className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <Yard>
                    <RText className="text-sm text-gray-500">Redeemed At</RText>
                    <RText className="text-sm font-medium text-gray-900">
                      {formatDate(voucher.redeemed_at)}
                    </RText>
                  </Yard>
                </Area>
              )}
            </Area>
          </Area>

          {/* Action buttons */}
          <Area className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </Area>
        </Area>
      </Container>
    </Area>
  );
}
