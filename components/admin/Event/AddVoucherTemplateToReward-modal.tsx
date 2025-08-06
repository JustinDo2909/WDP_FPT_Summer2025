"use client";

import { Area, Container, RText, Yard } from "@/lib/by/Div";
import { useGetProductsQuery } from "@/process/api/api";
import type {
  AddVoucherTemplateToRewardRequest,
  LeaderboardReward,
} from "@/types/event";
import { Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface AddVoucherTemplateToRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddVoucherTemplateToRewardRequest) => void;
  isLoading?: boolean;
  reward?: LeaderboardReward | null;
}

export function AddVoucherTemplateToRewardModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: AddVoucherTemplateToRewardModalProps) {
  const [discountValue, setDiscountValue] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENT" | "AMOUNT">(
    "PERCENT",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Fetch products
  const { data: productsResponse } = useGetProductsQuery({});

  // Extract products array safely
  const products =
    productsResponse?.products ||
    productsResponse?.data ||
    productsResponse ||
    [];

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  // Get selected products
  const selectedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((product) =>
      selectedProductIds.includes(product.id),
    );
  }, [products, selectedProductIds]);

  useEffect(() => {
    if (!isOpen) {
      setDiscountValue("");
      setDiscountType("PERCENT");
      setSearchTerm("");
      setSelectedProductIds([]);
    }
  }, [isOpen]);

  const handleProductToggle = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: AddVoucherTemplateToRewardRequest = {
      discount_value: parseFloat(discountValue),
      type: discountType,
      productIds: discountType === "PERCENT" ? selectedProductIds : [],
    };

    onSubmit(data);
  };

  // const isFormValid =
  //   discountValue &&
  //   parseFloat(discountValue) > 0 &&
  //   (discountType === "AMOUNT" ||
  //     (discountType === "PERCENT" && selectedProductIds.length > 0));

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
        {/* Header - Fixed */}
        <Area className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <RText className="text-xl font-semibold text-gray-900">
            Add Voucher Template to Reward
          </RText>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </Area>

        {/* Content - Scrollable */}
        <Area className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Discount Value */}
            <Yard>
              <RText className="text-sm font-medium text-gray-700 mb-2">
                Discount Value *
              </RText>
              <input
                type="number"
                min="0"
                step="0.01"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="Enter discount value..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </Yard>

            {/* Discount Type */}
            <Yard>
              <RText className="text-sm font-medium text-gray-700 mb-2">
                Discount Type *
              </RText>
              <select
                value={discountType}
                onChange={(e) => {
                  setDiscountType(e.target.value as "PERCENT" | "AMOUNT");
                  if (e.target.value === "AMOUNT") {
                    setSelectedProductIds([]);
                    setSearchTerm("");
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PERCENT">Percentage (%)</option>
                <option value="AMOUNT">Fixed Amount (₫)</option>
              </select>
            </Yard>

            {/* Product Selection (Only for PERCENT type) */}
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
              (discountType === "PERCENT" && selectedProductIds.length === 0)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Adding..." : "Add Voucher Template"}
          </button>
        </Area>
      </Container>
    </Area>
  );
}
