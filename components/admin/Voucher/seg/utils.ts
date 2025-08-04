"use client";

import { useState, useMemo } from "react";
import { useGetAllVoucherssQuery } from "@/process/api/api";
import type {
  Voucher,
  VoucherDisplay,
  VoucherStats,
  VoucherFilterType,
  VoucherStatusType,
} from "@/types/voucher/index";

// Hook quản lý vouchers với API
export const useVouchersApiLogic = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherDisplay | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<VoucherFilterType>("ALL");
  const [statusFilter, setStatusFilter] = useState<VoucherStatusType>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch vouchers from API
  const {
    data: vouchersData = [],
    isLoading,
    error,
    refetch,
  } = useGetAllVoucherssQuery();

  // Transform vouchers để thêm computed properties
  const vouchersDisplay: VoucherDisplay[] = useMemo(() => {
    return vouchersData.map(
      (voucher): VoucherDisplay => ({
        ...voucher,
        // Add type from voucherTemplate if available
        type: voucher.voucherTemplate?.type || voucher.type,
        discountDisplay: getDiscountDisplay(voucher),
        statusText: getStatusText(voucher),
        formattedCreatedAt: formatDate(voucher.created_at),
      })
    );
  }, [vouchersData]);

  // Filter vouchers dựa trên filter state
  const filteredVouchers = useMemo(() => {
    return vouchersDisplay.filter((voucher) => {
      // Type filter
      if (filterType !== "ALL" && voucher.type !== filterType) {
        return false;
      }

      // Status filter
      if (statusFilter !== "ALL") {
        const isRedeemed = voucher.redeemed;
        if (statusFilter === "REDEEMED" && !isRedeemed) return false;
        if (statusFilter === "AVAILABLE" && isRedeemed) return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          voucher.stripe_coupon_id.toLowerCase().includes(searchLower) ||
          voucher.user_id.toLowerCase().includes(searchLower) ||
          voucher.user?.name.toLowerCase().includes(searchLower) ||
          voucher.id.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [vouchersDisplay, filterType, statusFilter, searchTerm]);

  // Calculate stats
  const stats: VoucherStats = useMemo(() => {
    return calculateVoucherStats(vouchersDisplay);
  }, [vouchersDisplay]);

  const handleViewVoucher = (voucher: VoucherDisplay) => {
    setSelectedVoucher(voucher);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedVoucher(null);
  };

  const handleExportVouchers = () => {
    const headers = [
      "Voucher ID",
      "User ID",
      "Event Reward ID",
      "Stripe Coupon ID",
      "Discount Value",
      "Type",
      "Redeemed",
      "Redeemed At",
      "Created At",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredVouchers.map((voucher) =>
        [
          voucher.id,
          voucher.user_id,
          voucher.event_reward_id,
          voucher.stripe_coupon_id,
          voucher.discount_value,
          voucher.type,
          voucher.redeemed ? "Yes" : "No",
          voucher.redeemed_at || "N/A",
          voucher.formattedCreatedAt,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vouchers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    vouchers: filteredVouchers,
    allVouchers: vouchersDisplay,
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
    handleExportVouchers,
    refetch,
  };
};

// Utility functions
export const getDiscountDisplay = (voucher: Voucher): string => {
  // Check if voucher has voucherTemplate with discount info
  if (voucher.voucherTemplate) {
    if (voucher.voucherTemplate.type === "PERCENT") {
      return `${voucher.voucherTemplate.discount_value}%`;
    } else {
      return `${formatCurrency(voucher.voucherTemplate.discount_value)}`;
    }
  }

  // Fallback to direct properties if voucherTemplate doesn't exist
  if (voucher.type === "PERCENT") {
    return `${voucher.discount_value}%`;
  } else {
    return `${formatCurrency(voucher.discount_value)}`;
  }
};

export const getStatusText = (voucher: Voucher): string => {
  return voucher.redeemed ? "Redeemed" : "Available";
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (voucher: Voucher): string => {
  if (voucher.redeemed) {
    return "bg-gray-100 text-gray-800 border-gray-200";
  } else {
    return "bg-green-100 text-green-800 border-green-200";
  }
};

export const calculateVoucherStats = (
  vouchers: VoucherDisplay[]
): VoucherStats => {
  const total = vouchers.length;
  const redeemed = vouchers.filter((v) => v.redeemed).length;
  const available = total - redeemed;

  // Calculate usage rate as percentage of redeemed vouchers
  const usageRate = total > 0 ? Math.round((redeemed / total) * 100) : 0;

  const percentVouchers = vouchers.filter((v) => v.type === "PERCENT").length;
  const amountVouchers = vouchers.filter((v) => v.type === "AMOUNT").length;

  return {
    total,
    redeemed,
    available,
    usageRate,
    percentVouchers,
    amountVouchers,
  };
};
