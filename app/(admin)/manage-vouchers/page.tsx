"use client";

import { useState, useMemo } from "react";
import { StatsCard, MiniStatsCard } from "@/components/admin/StatsCard";
import {
  useVouchersApiLogic,
  getStatusColor,
  getDiscountDisplay,
} from "@/components/admin/Voucher/seg/utils";

import type {
  VoucherFilterType,
  VoucherStatusType,
} from "@/types/voucher/index";
import { Area, RText, Yard, Container, Core } from "@/lib/by/Div";
import {
  Eye,
  Ticket,
  TrendingUp,
  CheckCircle,
  Clock,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  User,
} from "lucide-react";
import { VoucherDetailModal } from "@/components/admin/Voucher/Voucher-detail-modal";

export default function VoucherPage() {
  const {
    vouchers,
    selectedVoucher,
    isDetailModalOpen,
    isLoading,
    error,
    stats,
    filterType,
    statusFilter,
    searchTerm,
    setFilterType,
    setStatusFilter,
    setSearchTerm,
    handleViewVoucher,
    handleCloseDetailModal,
    // handleExportVouchers,
    refetch,
  } = useVouchersApiLogic();

  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  // Group vouchers by user and sort by voucher count
  const groupedVouchers = useMemo(() => {
    const groups: { [key: string]: typeof vouchers } = {};

    vouchers.forEach((voucher) => {
      const userId = voucher.user?.id || voucher.user_id;
      const userName = voucher.user?.name || voucher.user_id;
      const key = `${userId}-${userName}`;

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(voucher);
    });

    // Convert to array and sort by voucher count (descending)
    return Object.entries(groups)
      .map(([key, userVouchers]) => ({
        key,
        userId: userVouchers[0].user?.id || userVouchers[0].user_id,
        userName: userVouchers[0].user?.name || userVouchers[0].user_id,
        vouchers: userVouchers,
        voucherCount: userVouchers.length,
      }))
      .sort((a, b) => b.voucherCount - a.voucherCount);
  }, [vouchers]);

  const toggleUserExpansion = (userKey: string) => {
    setExpandedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userKey)) {
        newSet.delete(userKey);
      } else {
        newSet.add(userKey);
      }
      return newSet;
    });
  };

  if (error) {
    return (
      <Container className="p-6">
        <Area className="bg-red-50 border border-red-200 rounded-lg p-4">
          <RText className="text-red-800 font-medium">
            Error loading vouchers: {error.toString()}
          </RText>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </Area>
      </Container>
    );
  }

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Voucher Management
        </RText>
      </header>

      <Container className="flex-1 overflow-auto p-6 space-y-6">
        <Area>
          <RText className="text-gray-600">
            View and manage all vouchers issued from events{" "}
          </RText>
        </Area>
        {/* Stats Cards */}
        <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Vouchers"
            value={stats.total.toString()}
            icon={Ticket}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
          <StatsCard
            title="Available"
            value={stats.available.toString()}
            icon={Clock}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatsCard
            title="Redeemed"
            value={stats.redeemed.toString()}
            icon={CheckCircle}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
          />
          <StatsCard
            title="Usage Rate"
            value={`${stats.usageRate}%`}
            icon={TrendingUp}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-50"
            valueColor="text-orange-600"
          />
        </Area>

        {/* Mini Stats */}
        <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MiniStatsCard
            value={stats.percentVouchers.toString()}
            label="Percent Vouchers"
            valueColor="text-blue-600"
          />
          <MiniStatsCard
            value={stats.amountVouchers.toString()}
            label="Amount Vouchers"
            valueColor="text-purple-600"
          />
        </Area>

        {/* Filters */}
        <Area className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <Area className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <Area className="flex-1 min-w-64">
              <Area className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, User Name, or Coupon Code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </Area>
            </Area>

            {/* Type Filter */}
            <Area className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as VoucherFilterType)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">All Types</option>
                <option value="PERCENT">Percentage</option>
                <option value="AMOUNT">Fixed Amount</option>
              </select>
            </Area>

            {/* Status Filter */}
            <Area>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as VoucherStatusType)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">All Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="REDEEMED">Redeemed</option>
              </select>
            </Area>

            {/* Clear Filters */}
            {(searchTerm || filterType !== "ALL" || statusFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("ALL");
                  setStatusFilter("ALL");
                }}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}
          </Area>
        </Area>

        {/* User Groups */}
        <Area className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Area className="p-6">
            <Area className="flex items-center justify-between mb-4">
              <RText className="text-lg font-semibold text-gray-900">
                Users with Vouchers ({groupedVouchers.length})
              </RText>
            </Area>

            {isLoading ? (
              <Area className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                <RText className="ml-2 text-gray-500">
                  Loading vouchers...
                </RText>
              </Area>
            ) : groupedVouchers.length === 0 ? (
              <Area className="text-center py-8">
                <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <RText className="text-gray-500">No vouchers found</RText>
              </Area>
            ) : (
              <Area className="space-y-4">
                {groupedVouchers.map((userGroup) => {
                  const isExpanded = expandedUsers.has(userGroup.key);
                  const availableVouchers = userGroup.vouchers.filter(
                    (v) => !v.redeemed
                  ).length;
                  const redeemedVouchers = userGroup.vouchers.filter(
                    (v) => v.redeemed
                  ).length;

                  return (
                    <Yard
                      key={userGroup.key}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {/* User Header */}
                      <Area
                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                        onClick={() => toggleUserExpansion(userGroup.key)}
                      >
                        <Area className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-600" />
                          <Yard>
                            <RText className="font-medium text-gray-900">
                              {userGroup.userName}
                            </RText>
                            <RText className="text-sm text-gray-500">
                              {userGroup.voucherCount} voucher
                              {userGroup.voucherCount !== 1 ? "s" : ""}
                            </RText>
                          </Yard>
                        </Area>

                        <Area className="flex items-center gap-4">
                          {/* Voucher Stats */}
                          <Area className="flex items-center gap-3 text-sm">
                            <Yard className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-green-600" />
                              <RText className="text-green-600 font-medium">
                                {availableVouchers}
                              </RText>
                            </Yard>
                            <Yard className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-purple-600" />
                              <RText className="text-purple-600 font-medium">
                                {redeemedVouchers}
                              </RText>
                            </Yard>
                          </Area>

                          {/* Expand/Collapse Icon */}
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                          )}
                        </Area>
                      </Area>

                      {/* Vouchers List */}
                      {isExpanded && (
                        <Area className="border-t border-gray-200">
                          <Area className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                                    Coupon Code
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                                    Discount
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                                    Status
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                                    Created
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                                    Redeemed
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {userGroup.vouchers.map((voucher) => (
                                  <tr
                                    key={voucher.id}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                  >
                                    <td className="py-3 px-4">
                                      <RText className="font-mono text-sm font-medium text-purple-600">
                                        {voucher.stripe_coupon_id}
                                      </RText>
                                    </td>
                                    <td className="py-3 px-4">
                                      <Yard>
                                        <RText className="text-lg font-bold text-green-600">
                                          {getDiscountDisplay(voucher)}
                                        </RText>
                                        <RText className="text-xs text-gray-500 capitalize">
                                          {voucher.type === "PERCENT"
                                            ? "Percentage"
                                            : "Fixed Amount"}
                                        </RText>
                                      </Yard>
                                    </td>
                                    <td className="py-3 px-4">
                                      <span
                                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(voucher)}`}
                                      >
                                        {voucher.redeemed ? (
                                          <CheckCircle className="w-3 h-3" />
                                        ) : (
                                          <Clock className="w-3 h-3" />
                                        )}
                                        {voucher.statusText}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <RText className="text-sm text-gray-900">
                                        {voucher.formattedCreatedAt}
                                      </RText>
                                    </td>
                                    <td className="py-3 px-4">
                                      <RText className="text-sm text-gray-900">
                                        {voucher.redeemed_at
                                          ? voucher.formattedCreatedAt
                                          : "N/A"}
                                      </RText>
                                    </td>
                                    <td className="py-3 px-4">
                                      <button
                                        onClick={() =>
                                          handleViewVoucher(voucher)
                                        }
                                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                                        title="View Details"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Area>
                        </Area>
                      )}
                    </Yard>
                  );
                })}
              </Area>
            )}
          </Area>
        </Area>
      </Container>

      {/* Detail Modal */}
      <VoucherDetailModal
        voucher={selectedVoucher}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </Core>
  );
}
