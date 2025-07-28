"use client";

import {
  X,
  Package,
  Calendar,
  AlertTriangle,
  TrendingDown,
  Percent,
} from "lucide-react";
import { Area, RText, Yard } from "@/lib/by/Div";
import type { BatchWithStatus } from "@/types/warehouse/index";
import type { Product } from "@/types/productManagement/index";

const statusColors = {
  active: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Active",
  },
  expired: {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "Expired",
  },
  "out-of-stock": {
    bg: "bg-gray-100",
    text: "text-gray-800",
    label: "Out of Stock",
  },
};

interface BatchDetailModalProps {
  batch: BatchWithStatus;
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function BatchDetailModal({
  batch,
  product,
  isOpen,
  onClose,
}: BatchDetailModalProps) {
  if (!isOpen) return null;

  const statusConfig = statusColors[batch.status];
  const stockPercentage =
    batch.quantity > 0
      ? Math.round((batch.current_stock / batch.quantity) * 100)
      : 0;
  const soldQuantity = batch.quantity - batch.current_stock;
  const soldPercentage =
    batch.quantity > 0 ? Math.round((soldQuantity / batch.quantity) * 100) : 0;

  const isExpiringSoon = () => {
    const expireDate = new Date(batch.expired_at);
    const today = new Date();
    const diffTime = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const getDaysUntilExpiry = () => {
    const expireDate = new Date(batch.expired_at);
    const today = new Date();
    const diffTime = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US");
  };

  return (
    <Yard className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Yard className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <Area className="flex items-center justify-between p-6 border-b border-gray-200">
          <Area className="flex items-center space-x-4">
            {product && (
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <Yard>
              <RText className="text-xl font-bold text-gray-900">
                Batch #{batch.id}
              </RText>
              <RText className="text-gray-600">
                {product?.title || `Product ${batch.product_id}`}
              </RText>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${statusConfig.bg} ${statusConfig.text}`}
              >
                {statusConfig.label}
              </span>
            </Yard>
          </Area>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </Area>

        {/* Content */}
        <Yard className="p-6 space-y-6">
          {/* Product Information */}
          {product && (
            <Area>
              <RText className="text-lg font-semibold text-gray-900 mb-3">
                Product Information
              </RText>
              <Yard className="bg-gray-50 rounded-lg p-4">
                <Area className="grid grid-cols-2 gap-4">
                  <Yard>
                    <RText className="text-sm text-gray-500">
                      Product Name
                    </RText>
                    <RText className="font-medium">{product.title}</RText>
                  </Yard>
                  <Yard>
                    <RText className="text-sm text-gray-500">Brand</RText>
                    <RText className="font-medium">
                      {product.productBrand?.title}
                    </RText>
                  </Yard>
                  <Yard>
                    <RText className="text-sm text-gray-500">Category</RText>
                    <RText className="font-medium">
                      {product.productCategory?.title}
                    </RText>
                  </Yard>
                  <Yard>
                    <RText className="text-sm text-gray-500">Product ID</RText>
                    <RText className="font-medium">{batch.product_id}</RText>
                  </Yard>
                </Area>
              </Yard>
            </Area>
          )}

          {/* Stock Information */}
          <Area>
            <RText className="text-lg font-semibold text-gray-900 mb-3">
              Stock Information
            </RText>
            <Yard className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Stock */}
              <Yard className="bg-blue-50 rounded-lg p-4">
                <Area className="flex items-center justify-between mb-2">
                  <RText className="text-sm text-blue-600">Current Stock</RText>
                  <Package className="w-5 h-5 text-blue-600" />
                </Area>
                <RText className="text-2xl font-bold text-blue-700">
                  {batch.current_stock}
                </RText>
                <RText className="text-sm text-blue-600">
                  {stockPercentage}% remaining
                </RText>
              </Yard>

              {/* Initial Quantity */}
              <Yard className="bg-green-50 rounded-lg p-4">
                <Area className="flex items-center justify-between mb-2">
                  <RText className="text-sm text-green-600">
                    Initial Quantity
                  </RText>
                  <Package className="w-5 h-5 text-green-600" />
                </Area>
                <RText className="text-2xl font-bold text-green-700">
                  {batch.quantity}
                </RText>
                <RText className="text-sm text-green-600">Total received</RText>
              </Yard>

              {/* Sold Quantity */}
              <Yard className="bg-orange-50 rounded-lg p-4">
                <Area className="flex items-center justify-between mb-2">
                  <RText className="text-sm text-orange-600">Sold</RText>
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                </Area>
                <RText className="text-2xl font-bold text-orange-700">
                  {soldQuantity}
                </RText>
                <RText className="text-sm text-orange-600">
                  {soldPercentage}% sold
                </RText>
              </Yard>
            </Yard>

            {/* Stock Progress Bar */}
            <Yard className="mt-4">
              <Area className="flex items-center justify-between mb-2">
                <RText className="text-sm text-gray-600">Stock Status</RText>
                <RText className="text-sm font-medium">
                  {batch.current_stock}/{batch.quantity}
                </RText>
              </Area>
              <Yard className="w-full bg-gray-200 rounded-full h-3">
                <Yard
                  className={`h-3 rounded-full transition-all ${
                    stockPercentage > 50
                      ? "bg-green-500"
                      : stockPercentage > 20
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${stockPercentage}%` }}
                />
              </Yard>
            </Yard>
          </Area>

          {/* Date Information */}
          <Area>
            <RText className="text-lg font-semibold text-gray-900 mb-3">
              Date Information
            </RText>
            <Yard className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Creation Date */}
              <Yard className="bg-gray-50 rounded-lg p-4">
                <Area className="flex items-center space-x-3 mb-2">
                  <Package className="w-5 h-5 text-gray-600" />
                  <RText className="text-sm font-medium text-gray-900">
                    Batch Created
                  </RText>
                </Area>
                <RText className="text-gray-800 font-medium">
                  {formatDate(batch.created_at)}
                </RText>
                <RText className="text-sm text-gray-500">
                  {formatDateTime(batch.created_at)}
                </RText>
              </Yard>

              {/* Expiry Date */}
              <Yard
                className={`rounded-lg p-4 ${
                  batch.status === "expired"
                    ? "bg-red-50"
                    : isExpiringSoon()
                      ? "bg-orange-50"
                      : "bg-gray-50"
                }`}
              >
                <Area className="flex items-center space-x-3 mb-2">
                  <Calendar
                    className={`w-5 h-5 ${
                      batch.status === "expired"
                        ? "text-red-600"
                        : isExpiringSoon()
                          ? "text-orange-600"
                          : "text-gray-600"
                    }`}
                  />
                  <RText
                    className={`text-sm font-medium ${
                      batch.status === "expired"
                        ? "text-red-900"
                        : isExpiringSoon()
                          ? "text-orange-900"
                          : "text-gray-900"
                    }`}
                  >
                    Expiry Date
                  </RText>
                  {isExpiringSoon() && (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  )}
                </Area>
                <RText
                  className={`font-medium ${
                    batch.status === "expired"
                      ? "text-red-800"
                      : isExpiringSoon()
                        ? "text-orange-800"
                        : "text-gray-800"
                  }`}
                >
                  {formatDate(batch.expired_at)}
                </RText>
                <RText
                  className={`text-sm ${
                    batch.status === "expired"
                      ? "text-red-600"
                      : isExpiringSoon()
                        ? "text-orange-600"
                        : "text-gray-500"
                  }`}
                >
                  {batch.status === "expired"
                    ? "Expired"
                    : `${getDaysUntilExpiry()} days remaining`}
                </RText>
              </Yard>
            </Yard>
          </Area>
        </Yard>
      </Yard>
    </Yard>
  );
}
