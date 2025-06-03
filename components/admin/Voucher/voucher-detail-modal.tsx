"use client";

import {
  X,
  Ticket,
  TrendingUp,
  Gift,
  Clock,
  CheckCircle,
  Ban,
  Edit2,
  Trash2,
  Play,
  Pause,
} from "lucide-react";
import { useState } from "react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  getStatusColor,
  getDiscountDisplay,
  getVoucherUsages,
  getVoucherRedemptions,
} from "@/components/admin/Voucher/seg/utils";
import { type Voucher } from "@/constants/manage-vouchers/index";

interface VoucherDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: Voucher | null;
  onEdit?: (voucher: Voucher) => void;
  onDelete?: (voucherId: string) => void;
  onToggleStatus?: (voucherId: string) => void;
}

export function VoucherDetailModal({
  isOpen,
  onClose,
  voucher,
  onEdit,
  onDelete,
  onToggleStatus,
}: VoucherDetailModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "usages" | "redemptions"
  >("overview");

  if (!isOpen || !voucher) return null;

  const voucherUsages = getVoucherUsages(voucher.id);
  const voucherRedemptions = getVoucherRedemptions(voucher.id);

  const getStatusIcon = (status: Voucher["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "inactive":
        return <Pause className="w-5 h-5 text-yellow-600" />;
      case "expired":
        return <Clock className="w-5 h-5 text-red-600" />;
      case "exhausted":
        return <Ban className="w-5 h-5 text-gray-600" />;
      default:
        return <Ticket className="w-5 h-5" />;
    }
  };

  const usagePercentage = voucher.usageLimit
    ? (voucher.usedCount / voucher.usageLimit) * 100
    : 0;

  return (
    <>
      {/* Backdrop */}
      <Core
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[9998] ${
          isOpen ? "bg-opacity-60" : "bg-opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <Core
        className={`fixed top-0 right-0 h-full w-full max-w-5xl bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Container className="h-full overflow-y-auto">
          {/* Header */}
          <Area className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <Yard>
              <RText className="text-xl font-semibold text-gray-900">
                Voucher Details
              </RText>
              <RText className="text-sm text-gray-500">
                Voucher ID: {voucher.id}
              </RText>
            </Yard>
            <Area className="flex items-center gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(voucher)}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              )}
              {onToggleStatus && (
                <button
                  onClick={() => onToggleStatus(voucher.id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    voucher.status === "active"
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  disabled={
                    voucher.status === "expired" ||
                    voucher.status === "exhausted"
                  }
                >
                  {voucher.status === "active" ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {voucher.status === "active" ? "Deactivate" : "Activate"}
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(voucher.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </Area>
          </Area>

          {/* Voucher Summary */}
          <Container className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <Area className="flex items-start gap-6">
              <Yard className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white">
                <Ticket className="w-10 h-10" />
              </Yard>
              <Yard className="flex-1">
                <Area className="flex items-center gap-3 mb-2">
                  <RText className="text-2xl font-bold text-gray-900">
                    {voucher.name}
                  </RText>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(voucher.status)}`}
                  >
                    {getStatusIcon(voucher.status)}
                    {voucher.status.charAt(0).toUpperCase() +
                      voucher.status.slice(1)}
                  </span>
                </Area>
                <RText className="text-lg text-gray-600 mb-3">
                  {voucher.description}
                </RText>
                <Area className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <Yard>
                    <RText className="text-gray-500">Voucher Code</RText>
                    <RText className="font-mono text-lg font-bold text-purple-600">
                      {voucher.code}
                    </RText>
                  </Yard>
                  <Yard>
                    <RText className="text-gray-500">Discount Value</RText>
                    <RText className="text-lg font-bold text-green-600">
                      {getDiscountDisplay(voucher)}
                    </RText>
                  </Yard>
                  <Yard>
                    <RText className="text-gray-500">Points Required</RText>
                    <RText className="text-lg font-bold text-blue-600">
                      {voucher.pointsRequired}
                    </RText>
                  </Yard>
                  <Yard>
                    <RText className="text-gray-500">Valid Period</RText>
                    <RText className="text-gray-900">
                      {formatDate(voucher.startDate)} -{" "}
                      {formatDate(voucher.endDate)}
                    </RText>
                  </Yard>
                </Area>
              </Yard>
              <Area className="grid grid-cols-2 gap-4 text-center">
                <Yard>
                  <RText className="text-2xl font-bold text-blue-600">
                    {voucher.usedCount}
                  </RText>
                  <RText className="text-xs text-gray-500">Times Used</RText>
                </Yard>
                <Yard>
                  <RText className="text-2xl font-bold text-purple-600">
                    {voucher.usageLimit || "∞"}
                  </RText>
                  <RText className="text-xs text-gray-500">Usage Limit</RText>
                </Yard>
              </Area>
            </Area>

            {/* Usage Progress */}
            {voucher.usageLimit && (
              <Area className="mt-4">
                <Area className="flex justify-between text-sm mb-2">
                  <RText className="text-gray-600">Usage Progress</RText>
                  <RText className="text-gray-600">
                    {voucher.usedCount} / {voucher.usageLimit} (
                    {usagePercentage.toFixed(1)}%)
                  </RText>
                </Area>
                <Area className="w-full bg-gray-200 rounded-full h-2">
                  <Area
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  />
                </Area>
              </Area>
            )}
          </Container>

          {/* Tabs */}
          <Container className="border-b border-gray-200">
            <Area className="flex">
              {[
                { id: "overview", label: "Overview", icon: Ticket },
                { id: "usages", label: "Usage History", icon: TrendingUp },
                { id: "redemptions", label: "Redemptions", icon: Gift },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.id === "usages" && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {voucherUsages.length}
                      </span>
                    )}
                    {tab.id === "redemptions" && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {voucherRedemptions.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </Area>
          </Container>

          {/* Tab Content */}
          <Container className="p-6">
            {activeTab === "overview" && (
              <Area className="space-y-6">
                <Yard>
                  <RText className="text-lg font-medium text-gray-900 mb-4">
                    Voucher Information
                  </RText>
                  <Area className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Yard>
                      <RText className="text-sm font-medium text-gray-500">
                        Discount Type
                      </RText>
                      <RText className="text-gray-900 capitalize">
                        {voucher.discountType.replace("_", " ")}
                      </RText>
                    </Yard>
                    <Yard>
                      <RText className="text-sm font-medium text-gray-500">
                        Created Date
                      </RText>
                      <RText className="text-gray-900">
                        {formatDateTime(voucher.createdDate)}
                      </RText>
                    </Yard>
                    <Yard>
                      <RText className="text-sm font-medium text-gray-500">
                        Created By
                      </RText>
                      <RText className="text-gray-900">
                        {voucher.createdBy}
                      </RText>
                    </Yard>
                    {voucher.minOrderAmount && (
                      <Yard>
                        <RText className="text-sm font-medium text-gray-500">
                          Minimum Order Amount
                        </RText>
                        <RText className="text-gray-900">
                          {formatCurrency(voucher.minOrderAmount)}
                        </RText>
                      </Yard>
                    )}
                    {voucher.maxDiscountAmount && (
                      <Yard>
                        <RText className="text-sm font-medium text-gray-500">
                          Maximum Discount Amount
                        </RText>
                        <RText className="text-gray-900">
                          {formatCurrency(voucher.maxDiscountAmount)}
                        </RText>
                      </Yard>
                    )}
                  </Area>
                </Yard>

                {voucher.applicableCategories &&
                  voucher.applicableCategories.length > 0 && (
                    <Yard>
                      <RText className="text-lg font-medium text-gray-900 mb-4">
                        Applicable Categories
                      </RText>
                      <Area className="flex flex-wrap gap-2">
                        {voucher.applicableCategories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </Area>
                    </Yard>
                  )}

                <Yard>
                  <RText className="text-lg font-medium text-gray-900 mb-4">
                    Statistics
                  </RText>
                  <Area className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Yard className="bg-blue-50 rounded-lg p-4">
                      <RText className="text-2xl font-bold text-blue-600">
                        {voucherRedemptions.length}
                      </RText>
                      <RText className="text-sm text-gray-600">
                        Total Redemptions
                      </RText>
                    </Yard>
                    <Yard className="bg-green-50 rounded-lg p-4">
                      <RText className="text-2xl font-bold text-green-600">
                        {voucherUsages.length}
                      </RText>
                      <RText className="text-sm text-gray-600">
                        Total Uses
                      </RText>
                    </Yard>
                    <Yard className="bg-purple-50 rounded-lg p-4">
                      <RText className="text-2xl font-bold text-purple-600">
                        {formatCurrency(
                          voucherUsages.reduce(
                            (sum, usage) => sum + usage.discountAmount,
                            0
                          )
                        )}
                      </RText>
                      <RText className="text-sm text-gray-600">
                        Total Discount Given
                      </RText>
                    </Yard>
                  </Area>
                </Yard>
              </Area>
            )}

            {activeTab === "usages" && (
              <Area>
                <RText className="text-lg font-medium text-gray-900 mb-4">
                  Usage History ({voucherUsages.length} uses)
                </RText>
                {voucherUsages.length > 0 ? (
                  <Area className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Customer
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Order ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Used Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Order Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Discount Given
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {voucherUsages.map((usage) => (
                          <tr key={usage.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <Yard>
                                <RText className="font-medium text-gray-900">
                                  {usage.customerName}
                                </RText>
                                <RText className="text-sm text-gray-500">
                                  {usage.customerEmail}
                                </RText>
                              </Yard>
                            </td>
                            <td className="px-4 py-3 font-mono text-sm text-blue-600">
                              {usage.orderId}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {formatDateTime(usage.usedDate)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {formatCurrency(usage.orderAmount)}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-green-600">
                              {formatCurrency(usage.discountAmount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Area>
                ) : (
                  <Area className="text-center py-8 text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <RText>No usage history found for this voucher</RText>
                  </Area>
                )}
              </Area>
            )}

            {activeTab === "redemptions" && (
              <Area>
                <RText className="text-lg font-medium text-gray-900 mb-4">
                  Redemption History ({voucherRedemptions.length} redemptions)
                </RText>
                {voucherRedemptions.length > 0 ? (
                  <Area className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Customer
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Points Used
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Redeemed Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {voucherRedemptions.map((redemption) => (
                          <tr key={redemption.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <Yard>
                                <RText className="font-medium text-gray-900">
                                  {redemption.customerName}
                                </RText>
                                <RText className="text-sm text-gray-500">
                                  {redemption.customerEmail}
                                </RText>
                              </Yard>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-purple-600">
                              {redemption.pointsUsed}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {formatDateTime(redemption.redeemedDate)}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  redemption.status === "used"
                                    ? "bg-green-100 text-green-800"
                                    : redemption.status === "redeemed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {redemption.status.charAt(0).toUpperCase() +
                                  redemption.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Area>
                ) : (
                  <Area className="text-center py-8 text-gray-500">
                    <Gift className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <RText>No redemption history found for this voucher</RText>
                  </Area>
                )}
              </Area>
            )}
          </Container>
        </Container>
      </Core>
    </>
  );
}
