"use client";

import type React from "react";

import { useState } from "react";
import type {
  Voucher,
  VoucherUsage,
  VoucherRedemption,
} from "@/constants/manage-vouchers/index";
import {
  sampleVouchers,
  sampleVoucherUsages,
  sampleVoucherRedemptions,
} from "@/constants/manage-vouchers/index";

export interface VoucherFormData {
  code: string;
  name: string;
  description: string;
  discountType: "percentage" | "fixed_amount";
  discountValue: string;
  pointsRequired: string;
  startDate: string;
  endDate: string;
  usageLimit: string;
  minOrderAmount: string;
  maxDiscountAmount: string;
  applicableCategories: string[];
}

// Hook quản lý vouchers
export const useVouchersLogic = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>(sampleVouchers);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [voucherUsages] = useState<VoucherUsage[]>(sampleVoucherUsages);
  const [voucherRedemptions] = useState<VoucherRedemption[]>(
    sampleVoucherRedemptions
  );

  const handleViewVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedVoucher(null);
  };

  const handleAddVoucher = () => {
    setEditingVoucher(null);
    setIsAddModalOpen(true);
  };

  const handleEditVoucher = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingVoucher(null);
  };

  const handleSubmitVoucher = (voucherData: Voucher) => {
    if (editingVoucher) {
      // Update existing voucher
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.id === voucherData.id ? voucherData : voucher
        )
      );
      // Update selectedVoucher if viewing details
      if (selectedVoucher && selectedVoucher.id === voucherData.id) {
        setSelectedVoucher(voucherData);
      }
    } else {
      // Add new voucher
      setVouchers((prev) => [...prev, voucherData]);
    }
    setIsAddModalOpen(false);
    setEditingVoucher(null);
  };

  const handleDeleteVoucher = (voucherId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this voucher? This action cannot be undone."
      )
    ) {
      setVouchers((prev) => prev.filter((voucher) => voucher.id !== voucherId));
      if (selectedVoucher && selectedVoucher.id === voucherId) {
        handleCloseDetailModal();
      }
    }
  };

  const handleToggleVoucherStatus = (voucherId: string) => {
    setVouchers((prev) =>
      prev.map((voucher) =>
        voucher.id === voucherId
          ? {
              ...voucher,
              status: voucher.status === "active" ? "inactive" : "active",
            }
          : voucher
      )
    );
    // Update selectedVoucher if viewing details
    if (selectedVoucher && selectedVoucher.id === voucherId) {
      setSelectedVoucher((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "active" ? "inactive" : "active",
            }
          : null
      );
    }
  };

  const handleExportVouchers = () => {
    const headers = [
      "Voucher ID",
      "Code",
      "Name",
      "Discount Type",
      "Discount Value",
      "Points Required",
      "Status",
      "Usage Limit",
      "Used Count",
      "Start Date",
      "End Date",
    ];
    const csvContent = [
      headers.join(","),
      ...vouchers.map((voucher) =>
        [
          voucher.id,
          voucher.code,
          `"${voucher.name}"`,
          voucher.discountType,
          voucher.discountValue,
          voucher.pointsRequired,
          voucher.status,
          voucher.usageLimit || "Unlimited",
          voucher.usedCount,
          new Date(voucher.startDate).toLocaleDateString(),
          new Date(voucher.endDate).toLocaleDateString(),
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
    vouchers,
    selectedVoucher,
    isDetailModalOpen,
    isAddModalOpen,
    editingVoucher,
    voucherUsages,
    voucherRedemptions,
    handleViewVoucher,
    handleCloseDetailModal,
    handleAddVoucher,
    handleEditVoucher,
    handleCloseAddModal,
    handleSubmitVoucher,
    handleDeleteVoucher,
    handleToggleVoucherStatus,
    handleExportVouchers,
  };
};

// Hook quản lý voucher form
export const useVoucherForm = (editVoucher?: Voucher | null) => {
  const [formData, setFormData] = useState<VoucherFormData>({
    code: editVoucher?.code || "",
    name: editVoucher?.name || "",
    description: editVoucher?.description || "",
    discountType: editVoucher?.discountType || "percentage",
    discountValue: editVoucher?.discountValue?.toString() || "",
    pointsRequired: editVoucher?.pointsRequired?.toString() || "",
    startDate: editVoucher?.startDate
      ? editVoucher.startDate.split("T")[0]
      : "",
    endDate: editVoucher?.endDate ? editVoucher.endDate.split("T")[0] : "",
    usageLimit: editVoucher?.usageLimit?.toString() || "",
    minOrderAmount: editVoucher?.minOrderAmount?.toString() || "",
    maxDiscountAmount: editVoucher?.maxDiscountAmount?.toString() || "",
    applicableCategories: editVoucher?.applicableCategories || [],
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const generateVoucherCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange("code", result);
  };

  const validateForm = (data: VoucherFormData) => {
    const errors: any = {};

    if (!data.code?.trim()) {
      errors.code = "Voucher code is required";
    }

    if (!data.name?.trim()) {
      errors.name = "Voucher name is required";
    }

    if (!data.description?.trim()) {
      errors.description = "Description is required";
    }

    if (!data.discountValue || Number.parseFloat(data.discountValue) <= 0) {
      errors.discountValue = "Valid discount value is required";
    }

    if (
      data.discountType === "percentage" &&
      Number.parseFloat(data.discountValue) > 100
    ) {
      errors.discountValue = "Percentage cannot exceed 100%";
    }

    if (!data.pointsRequired || Number.parseInt(data.pointsRequired) <= 0) {
      errors.pointsRequired = "Valid points required is needed";
    }

    if (!data.startDate) {
      errors.startDate = "Start date is required";
    }

    if (!data.endDate) {
      errors.endDate = "End date is required";
    }

    if (
      data.startDate &&
      data.endDate &&
      new Date(data.startDate) >= new Date(data.endDate)
    ) {
      errors.endDate = "End date must be after start date";
    }

    if (data.usageLimit && Number.parseInt(data.usageLimit) <= 0) {
      errors.usageLimit = "Usage limit must be greater than 0";
    }

    if (data.minOrderAmount && Number.parseFloat(data.minOrderAmount) < 0) {
      errors.minOrderAmount = "Minimum order amount cannot be negative";
    }

    if (
      data.maxDiscountAmount &&
      Number.parseFloat(data.maxDiscountAmount) <= 0
    ) {
      errors.maxDiscountAmount =
        "Maximum discount amount must be greater than 0";
    }

    return errors;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: Voucher) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const voucherData: Voucher = {
      ...formData,
      id:
        editVoucher?.id ||
        `VOU-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(3, "0")}`,
      discountValue: Number.parseFloat(formData.discountValue),
      pointsRequired: Number.parseInt(formData.pointsRequired),
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate + "T23:59:59").toISOString(),
      usageLimit: formData.usageLimit
        ? Number.parseInt(formData.usageLimit)
        : null,
      minOrderAmount: formData.minOrderAmount
        ? Number.parseFloat(formData.minOrderAmount)
        : undefined,
      maxDiscountAmount: formData.maxDiscountAmount
        ? Number.parseFloat(formData.maxDiscountAmount)
        : undefined,
      usedCount: editVoucher?.usedCount || 0,
      status: editVoucher?.status || "active",
      createdDate: editVoucher?.createdDate || new Date().toISOString(),
      createdBy: editVoucher?.createdBy || "Admin",
    };

    try {
      await onSubmit(voucherData);
    } catch (error) {
      console.error("Error submitting voucher:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    generateVoucherCode,
    handleSubmit,
  };
};

// Utility functions
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status: Voucher["status"]) => {
  const colors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-yellow-100 text-yellow-800",
    expired: "bg-red-100 text-red-800",
    exhausted: "bg-gray-100 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const getDiscountDisplay = (voucher: Voucher) => {
  if (voucher.discountType === "percentage") {
    return `${voucher.discountValue}%`;
  }
  return formatCurrency(voucher.discountValue);
};

export const getVoucherUsages = (voucherId: string): VoucherUsage[] => {
  return sampleVoucherUsages.filter((usage) => usage.voucherId === voucherId);
};

export const getVoucherRedemptions = (
  voucherId: string
): VoucherRedemption[] => {
  return sampleVoucherRedemptions.filter(
    (redemption) => redemption.voucherId === voucherId
  );
};

export const calculateVoucherStats = (
  vouchers: Voucher[],
  usages: VoucherUsage[],
  redemptions: VoucherRedemption[]
) => {
  const totalVouchers = vouchers.length;
  const activeVouchers = vouchers.filter((v) => v.status === "active").length;
  const expiredVouchers = vouchers.filter((v) => v.status === "expired").length;
  const exhaustedVouchers = vouchers.filter(
    (v) => v.status === "exhausted"
  ).length;

  const totalUsages = usages.length;
  const totalRedemptions = redemptions.length;
  const totalDiscountGiven = usages.reduce(
    (sum, usage) => sum + usage.discountAmount,
    0
  );
  const totalPointsRedeemed = redemptions.reduce(
    (sum, redemption) => sum + redemption.pointsUsed,
    0
  );

  const usageRate = totalVouchers > 0 ? (totalUsages / totalVouchers) * 100 : 0;
  const redemptionRate =
    totalRedemptions > 0 ? (totalUsages / totalRedemptions) * 100 : 0;

  return {
    totalVouchers,
    activeVouchers,
    expiredVouchers,
    exhaustedVouchers,
    totalUsages,
    totalRedemptions,
    totalDiscountGiven,
    totalPointsRedeemed,
    usageRate,
    redemptionRate,
  };
};

export const updateVoucherStatus = (voucher: Voucher): Voucher["status"] => {
  const now = new Date();
  const endDate = new Date(voucher.endDate);

  if (now > endDate) {
    return "expired";
  }

  if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
    return "exhausted";
  }

  return voucher.status;
};
