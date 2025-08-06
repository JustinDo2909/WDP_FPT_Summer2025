"use client";

import { useState, useEffect } from "react";
import { Area, RText, Yard, Container } from "@/lib/by/Div";
import { useGetProductsQuery } from "@/process/api/api";
import { X, Plus, Search, Trash2 } from "lucide-react";
import type {
  VoucherTemplate,
  CreateVoucherTemplateRequest,
  UpdateVoucherTemplateRequest,
} from "@/types/voucher/index";

interface VoucherTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateVoucherTemplateRequest | UpdateVoucherTemplateRequest,
  ) => void;
  isLoading?: boolean;
  voucherTemplate?: VoucherTemplate | null;
}

export function VoucherTemplateModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  voucherTemplate,
}: VoucherTemplateModalProps) {
  const [discountValue, setDiscountValue] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENT" | "AMOUNT">(
    "PERCENT",
  );
  const [userLimit, setUserLimit] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products for selection
  const { data: productsResponse } = useGetProductsQuery({
    page: 1,
    limit: 100,
  });

  // Extract products array from response
  const products =
    productsResponse?.products ||
    productsResponse?.data ||
    productsResponse ||
    [];

  useEffect(() => {
    if (voucherTemplate) {
      setDiscountValue(voucherTemplate.discount_value.toString());
      setDiscountType(voucherTemplate.type);
      setUserLimit(voucherTemplate.user_limit.toString());
      setSelectedProductIds(
        voucherTemplate.voucherProducts.map((vp) => vp.product.id),
      );
    } else {
      setDiscountValue("");
      setDiscountType("PERCENT");
      setUserLimit("");
      setSelectedProductIds([]);
    }
  }, [voucherTemplate]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const data = {
      discount_value: Number(discountValue),
      type: discountType,
      user_limit: Number(userLimit),
      productIds: discountType === "AMOUNT" ? [] : selectedProductIds,
    };

    onSubmit(data);
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const selectedProducts = Array.isArray(products)
    ? products.filter((product) => selectedProductIds.includes(product.id))
    : [];

  if (!isOpen) return null;

  return (
    <Area
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      onClick={onClose}
    >
      <Container
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <Area className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <RText className="text-xl font-semibold text-gray-900">
            {voucherTemplate ? "Edit Voucher Template" : "Add Voucher Template"}
          </RText>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </Area>

        <Area className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6 pb-0">
            <Area className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Discount Value */}
              <Yard>
                <RText className="text-sm font-medium text-gray-700 mb-2">
                  Discount Value
                </RText>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter discount value"
                  required
                  min="0"
                  step="0.01"
                />
              </Yard>

              {/* Discount Type */}
              <Yard>
                <RText className="text-sm font-medium text-gray-700 mb-2">
                  Discount Type
                </RText>
                <select
                  value={discountType}
                  onChange={(e) => {
                    const newType = e.target.value as "PERCENT" | "AMOUNT";
                    setDiscountType(newType);

                    if (newType === "AMOUNT") {
                      setSelectedProductIds([]);
                      setSearchTerm("");
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="PERCENT">Percentage (%)</option>
                  <option value="AMOUNT">Fixed Amount (VND)</option>
                </select>
              </Yard>

              {/* User Limit */}
              <Yard>
                <RText className="text-sm font-medium text-gray-700 mb-2">
                  User Limit
                </RText>
                <input
                  type="number"
                  value={userLimit}
                  onChange={(e) => setUserLimit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter user limit"
                  required
                  min="1"
                />
              </Yard>
            </Area>

            {discountType === "PERCENT" && (
              <Yard>
                <RText className="text-sm font-medium text-gray-700 mb-4">
                  Select Products ({selectedProductIds.length} selected)
                </RText>

                <Area className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </Area>

                {selectedProducts.length > 0 ? (
                  <Area className="mb-4">
                    <RText className="text-sm font-medium text-gray-700 mb-2">
                      Selected Products:
                    </RText>
                    <Area className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProducts.map((product) => (
                        <Area
                          key={product.id}
                          className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                          <RText className="text-sm text-gray-900 truncate">
                            {product.title}
                          </RText>
                          <button
                            type="button"
                            onClick={() => handleProductToggle(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </Area>
                      ))}
                    </Area>
                  </Area>
                ) : (
                  <Area className="mb-4">
                    <RText className="text-sm font-medium text-gray-700 mb-2">
                      Selected Products:
                    </RText>
                    <Area className="p-6 text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
                      <RText className="text-sm mb-2">
                        No products selected yet
                      </RText>
                      <RText className="text-xs text-gray-400">
                        Click on products from the list below to select them
                      </RText>
                    </Area>
                  </Area>
                )}

                {/* Product List */}
                <Area className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredProducts.length === 0 ? (
                    <Area className="p-4 text-center text-gray-500">
                      {searchTerm
                        ? "No products found matching your search"
                        : "No products available"}
                    </Area>
                  ) : (
                    <Area className="divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <Area
                          key={product.id}
                          className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedProductIds.includes(product.id)
                              ? "bg-blue-50 border-l-4 border-blue-500"
                              : ""
                          }`}
                          onClick={() => handleProductToggle(product.id)}
                        >
                          <Area className="flex items-center justify-between">
                            <Yard>
                              <RText className="font-medium text-gray-900">
                                {product.title}
                              </RText>
                              <RText className="text-sm text-gray-500">
                                {product.sale_price
                                  ? `₫${product.sale_price.toLocaleString()}`
                                  : `₫${product.price.toLocaleString()}`}
                              </RText>
                            </Yard>
                            {selectedProductIds.includes(product.id) && (
                              <Plus className="w-5 h-5 text-blue-500" />
                            )}
                          </Area>
                        </Area>
                      ))}
                    </Area>
                  )}
                </Area>
              </Yard>
            )}

            {/* Info for AMOUNT type */}
            {discountType === "AMOUNT" && (
              <Yard>
                <Area className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <RText className="text-sm text-blue-800 font-medium mb-1">
                    Fixed Amount Discount
                  </RText>
                  <RText className="text-xs text-blue-600">
                    This voucher template will apply a fixed amount discount to
                    the entire order. No specific products need to be selected.
                  </RText>
                </Area>
              </Yard>
            )}
          </form>
        </Area>

        {/* Footer - Fixed */}
        <Area className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !discountValue ||
              !userLimit ||
              (discountType === "PERCENT" && selectedProductIds.length === 0)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading
              ? "Saving..."
              : voucherTemplate
                ? "Update Template"
                : "Create Template"}
          </button>
        </Area>
      </Container>
    </Area>
  );
}
