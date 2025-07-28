"use client";

import { Calendar, Package, AlertTriangle, Percent } from "lucide-react";
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

interface BatchCardProps {
  batch: BatchWithStatus;
  product?: Product;
  onClick: () => void;
}

export function BatchCard({ batch, product, onClick }: BatchCardProps) {
  const statusConfig = statusColors[batch.status];
  const stockPercentage =
    batch.quantity > 0
      ? Math.round((batch.current_stock / batch.quantity) * 100)
      : 0;

  const isExpiringSoon = () => {
    const expireDate = new Date(batch.expired_at);
    const today = new Date();
    const diffTime = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US");
  };

  return (
    <Yard
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-[320px] flex flex-col"
      onClick={onClick}
    >
      {/* Header */}
      <Area className="flex items-start justify-between mb-3 min-h-[64px]">
        <Yard className="flex items-start space-x-3 flex-1 min-w-0">
          {product && (
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.title}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <Yard className="min-w-0 flex-1">
            <RText className="font-semibold text-gray-900 truncate">
              #{batch.id}
            </RText>
            <RText className="text-sm text-gray-500 line-clamp-2 leading-tight break-words">
              {product?.title || `Product ${batch.product_id}`}
            </RText>
          </Yard>
        </Yard>

        <Yard className="flex flex-col items-end space-y-1 flex-shrink-0 ml-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
          >
            {statusConfig.label}
          </span>
          {batch.discount && batch.discount > 0 && (
            <span className="flex items-center text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              <Percent className="w-3 h-3 mr-1" />-{batch.discount}%
            </span>
          )}
        </Yard>
      </Area>

      {/* Stock Info */}
      <Area className="mb-4 flex-shrink-0">
        <Area className="flex items-center justify-between mb-2">
          <RText className="text-sm text-gray-600">Stock</RText>
          <RText className="text-sm font-medium">
            {batch.current_stock}/{batch.quantity}
          </RText>
        </Area>

        <Yard className="w-full bg-gray-200 rounded-full h-2">
          <Yard
            className={`h-2 rounded-full transition-all ${
              stockPercentage > 50
                ? "bg-green-500"
                : stockPercentage > 20
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${stockPercentage}%` }}
          />
        </Yard>
        <RText className="text-xs text-gray-500 mt-1">
          {stockPercentage}% remaining
        </RText>
      </Area>

      {/* Dates */}
      <Area className="space-y-2 flex-1">
        <Area className="flex items-center text-sm text-gray-600">
          <Package className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">
            Received: {formatDate(batch.created_at)}
          </span>
        </Area>

        <Area
          className={`flex items-center text-sm ${
            batch.status === "expired"
              ? "text-red-600"
              : isExpiringSoon()
                ? "text-orange-600"
                : "text-gray-600"
          }`}
        >
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">
            Expires: {formatDate(batch.expired_at)}
          </span>
          {isExpiringSoon() && (
            <AlertTriangle className="w-4 h-4 ml-2 text-orange-500 flex-shrink-0" />
          )}
        </Area>
      </Area>

      {/* Supplier Info */}
      {batch.supplier && (
        <Area className="mt-3 pt-3 border-t border-gray-100 flex-shrink-0">
          <Area className="flex items-center text-xs text-gray-500">
            <span className="font-medium text-gray-700">Supplier:</span>
            <span className="ml-1 truncate">{batch.supplier.name}</span>
          </Area>
        </Area>
      )}

      {/* Product Info */}
      {product && (
        <Area className="mt-2 pt-2 border-t border-gray-100 flex-shrink-0">
          <Area className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate max-w-[45%]">
              {product.productBrand?.title}
            </span>
            <span className="truncate max-w-[45%]">
              {product.productCategory?.title}
            </span>
          </Area>
        </Area>
      )}
    </Yard>
  );
}
