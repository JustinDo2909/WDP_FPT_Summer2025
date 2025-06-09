"use client";

import {
  X,
  Ticket,
  Percent,
  DollarSign,
  Calendar,
  Shuffle,
  Tag,
  Gift,
} from "lucide-react";
import { useEffect } from "react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import {
  discountTypeOptions,
  categoryOptions,
} from "@/constants/manage-vouchers/index";
import { useVoucherForm } from "@/components/admin/Voucher/seg/utils";
import { type Voucher } from "@/constants/manage-vouchers/index";

interface AddVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (voucher: Voucher) => void;
  editVoucher?: Voucher | null;
}

export function AddVoucherModal({
  isOpen,
  onClose,
  onSubmit,
  editVoucher,
}: AddVoucherModalProps) {
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    generateVoucherCode,
    handleSubmit,
  } = useVoucherForm(editVoucher);

  // Reset form when editVoucher changes
  useEffect(() => {
    if (editVoucher) {
      Object.entries(editVoucher).forEach(([key, value]) => {
        if (key === "startDate" || key === "endDate") {
          handleInputChange(key, value ? value.split("T")[0] : "");
        } else if (
          key === "discountValue" ||
          key === "pointsRequired" ||
          key === "usageLimit" ||
          key === "minOrderAmount" ||
          key === "maxDiscountAmount"
        ) {
          handleInputChange(key, value?.toString() || "");
        } else {
          handleInputChange(key, value);
        }
      });
    }
  }, [editVoucher]);

  if (!isOpen) return null;

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = formData.applicableCategories || [];
    if (checked) {
      handleInputChange("applicableCategories", [
        ...currentCategories,
        category,
      ]);
    } else {
      handleInputChange(
        "applicableCategories",
        currentCategories.filter((c) => c !== category)
      );
    }
  };

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
        className={`fixed top-0 right-0 h-full w-full max-w-3xl bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Container className="h-full overflow-y-auto">
          {/* Header */}
          <Area className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <Yard>
              <RText className="text-xl font-semibold text-gray-900">
                {editVoucher ? "Edit Voucher" : "Create New Voucher"}
              </RText>
              <RText className="text-sm text-gray-500">
                {editVoucher
                  ? "Update voucher information"
                  : "Create a new discount voucher for customers"}
              </RText>
            </Yard>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </Area>

          {/* Form */}
          <form
            onSubmit={(e) => handleSubmit(e, onSubmit)}
            className="p-6 space-y-6"
          >
            {/* Basic Information */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                Basic Information
              </RText>

              <Area className="space-y-4">
                {/* Voucher Code */}
                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Voucher Code *
                  </RText>
                  <Area className="flex gap-2">
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) =>
                        handleInputChange("code", e.target.value.toUpperCase())
                      }
                      placeholder="Enter voucher code"
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors font-mono ${
                        errors.code ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={generateVoucherCode}
                      className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Shuffle className="w-4 h-4" />
                      Generate
                    </button>
                  </Area>
                  {errors.code && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.code}
                    </RText>
                  )}
                </Yard>

                {/* Name and Description */}
                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Voucher Name *
                  </RText>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter voucher name"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </RText>
                  )}
                </Yard>

                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </RText>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter voucher description"
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.description && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </RText>
                  )}
                </Yard>
              </Area>
            </Yard>

            {/* Discount Settings */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5" />
                Discount Settings
              </RText>

              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Discount Type */}
                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type *
                  </RText>
                  <select
                    value={formData.discountType}
                    onChange={(e) =>
                      handleInputChange("discountType", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    {discountTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Yard>

                {/* Discount Value */}
                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value *{" "}
                    {formData.discountType === "percentage" ? "(%)" : "($)"}
                  </RText>
                  <Area className="relative">
                    <input
                      type="number"
                      step={
                        formData.discountType === "percentage" ? "0.1" : "0.01"
                      }
                      min="0"
                      max={
                        formData.discountType === "percentage"
                          ? "100"
                          : undefined
                      }
                      value={formData.discountValue}
                      onChange={(e) =>
                        handleInputChange("discountValue", e.target.value)
                      }
                      placeholder={
                        formData.discountType === "percentage" ? "10" : "50.00"
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.discountValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <Yard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {formData.discountType === "percentage" ? (
                        <Percent className="w-4 h-4" />
                      ) : (
                        <DollarSign className="w-4 h-4" />
                      )}
                    </Yard>
                  </Area>
                  {errors.discountValue && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.discountValue}
                    </RText>
                  )}
                </Yard>
              </Area>

              {/* Additional Discount Settings */}
              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Order Amount ($)
                  </RText>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.minOrderAmount}
                    onChange={(e) =>
                      handleInputChange("minOrderAmount", e.target.value)
                    }
                    placeholder="0.00"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.minOrderAmount
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.minOrderAmount && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.minOrderAmount}
                    </RText>
                  )}
                </Yard>

                {formData.discountType === "percentage" && (
                  <Yard>
                    <RText className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Discount Amount ($)
                    </RText>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.maxDiscountAmount}
                      onChange={(e) =>
                        handleInputChange("maxDiscountAmount", e.target.value)
                      }
                      placeholder="100.00"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.maxDiscountAmount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.maxDiscountAmount && (
                      <RText className="text-red-500 text-sm mt-1">
                        {errors.maxDiscountAmount}
                      </RText>
                    )}
                  </Yard>
                )}
              </Area>
            </Yard>

            {/* Game Score & Usage Settings */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Game Score & Usage Settings
              </RText>

              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Points Required *
                  </RText>
                  <input
                    type="number"
                    min="1"
                    value={formData.pointsRequired}
                    onChange={(e) =>
                      handleInputChange("pointsRequired", e.target.value)
                    }
                    placeholder="500"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.pointsRequired
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.pointsRequired && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.pointsRequired}
                    </RText>
                  )}
                  <RText className="text-xs text-gray-500 mt-1">
                    Game score points needed to redeem this voucher
                  </RText>
                </Yard>

                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Limit
                  </RText>
                  <input
                    type="number"
                    min="1"
                    value={formData.usageLimit}
                    onChange={(e) =>
                      handleInputChange("usageLimit", e.target.value)
                    }
                    placeholder="Leave empty for unlimited"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.usageLimit ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.usageLimit && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.usageLimit}
                    </RText>
                  )}
                  <RText className="text-xs text-gray-500 mt-1">
                    Maximum number of times this voucher can be used
                  </RText>
                </Yard>
              </Area>
            </Yard>

            {/* Validity Period */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Validity Period
              </RText>

              <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </RText>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.startDate && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.startDate}
                    </RText>
                  )}
                </Yard>

                <Yard>
                  <RText className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </RText>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    min={formData.startDate}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.endDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.endDate && (
                    <RText className="text-red-500 text-sm mt-1">
                      {errors.endDate}
                    </RText>
                  )}
                </Yard>
              </Area>
            </Yard>

            {/* Applicable Categories */}
            <Yard>
              <RText className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Applicable Categories
              </RText>

              <Area className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categoryOptions.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        formData.applicableCategories?.includes(
                          category.value
                        ) || false
                      }
                      onChange={(e) =>
                        handleCategoryChange(category.value, e.target.checked)
                      }
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <RText className="text-sm text-gray-700">
                      {category.label}
                    </RText>
                  </label>
                ))}
              </Area>
              <RText className="text-xs text-gray-500 mt-2">
                Leave unchecked to apply to all categories
              </RText>
            </Yard>

            {/* Actions */}
            <Area className="flex justify-end space-x-3 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                  ? "Saving..."
                  : editVoucher
                    ? "Update Voucher"
                    : "Create Voucher"}
              </button>
            </Area>
          </form>
        </Container>
      </Core>
    </>
  );
}
