"use client";

import { useState, useRef, useEffect } from "react";
import { X, Package, Plus, Search, ChevronDown } from "lucide-react";
import { Area, RText, Yard } from "@/lib/by/Div";
import {
  useCreateProductBatchMutation,
  useGetProductsQuery,
  useGetSuppliersQuery,
} from "@/process/api/api";
import type { CreateBatchRequest, Supplier } from "@/types/warehouse/index";
import type { Product } from "@/types/productManagement/index";

interface AddBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  preselectedProductId?: string;
}

export function AddBatchModal({
  isOpen,
  onClose,
  onSuccess,
  preselectedProductId,
}: AddBatchModalProps) {
  const [selectedProductId, setSelectedProductId] = useState(
    preselectedProductId || ""
  );
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: productsResponse, isLoading: productsLoading } =
    useGetProductsQuery({
      page: 1,
      pageSize: 1000,
    });
  const { data: suppliers = [], isLoading: suppliersLoading } =
    useGetSuppliersQuery();
  const [createBatch] = useCreateProductBatchMutation();

  const products = productsResponse?.products || [];

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product: Product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productBrand?.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.productCategory?.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId || !quantity || !selectedSupplierId) {
      alert("Please fill in all required fields");
      return;
    }

    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    setIsSubmitting(true);

    try {
      const batchData: CreateBatchRequest = {
        quantity: quantityNum,
        supplier_id: selectedSupplierId,
      };

      await createBatch({
        productId: selectedProductId,
        data: batchData,
      }).unwrap();

      // Reset form
      setSelectedProductId(preselectedProductId || "");
      setSelectedSupplierId("");
      setQuantity("");
      setSearchTerm("");

      // Call success callback and close modal
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to create batch:", error);
      alert("Failed to create batch. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedProductId(preselectedProductId || "");
    setQuantity("");
    setSearchTerm("");
    setIsDropdownOpen(false);
    onClose();
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    const selectedProduct = products.find((p: Product) => p.id === productId);
    setSearchTerm(
      selectedProduct
        ? `${selectedProduct.title} - ${selectedProduct.productBrand?.title}`
        : ""
    );
    setIsDropdownOpen(false);
  };

  if (!isOpen) return null;

  const selectedProduct = products.find(
    (p: Product) => p.id === selectedProductId
  );

  return (
    <Yard className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Yard className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <Area className="flex items-center justify-between p-6 border-b border-gray-200">
          <Area className="flex items-center space-x-3">
            <Yard className="p-2 bg-blue-100 rounded-lg">
              <Plus className="w-5 h-5 text-blue-600" />
            </Yard>
            <Yard>
              <RText className="text-xl font-bold text-gray-900">
                Add New Batch
              </RText>
              <RText className="text-gray-600">
                Create a new inventory batch
              </RText>
            </Yard>
          </Area>

          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </Area>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Selection with Search */}
          <Yard>
            <RText className="block text-sm font-medium text-gray-700 mb-2">
              Product <span className="text-red-500">*</span>
            </RText>
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={
                    productsLoading
                      ? "Loading products..."
                      : "Search products..."
                  }
                  disabled={!!preselectedProductId || productsLoading}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                />
                <ChevronDown
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown List */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {productsLoading ? (
                    <div className="p-3 text-center text-gray-500">
                      Loading products...
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="p-3 text-center text-gray-500">
                      {searchTerm
                        ? "No products found"
                        : "No products available"}
                    </div>
                  ) : (
                    filteredProducts.map((product: Product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleProductSelect(product.id)}
                        className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.title}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <RText className="font-medium text-gray-900 truncate">
                              {product.title}
                            </RText>
                            <RText className="text-sm text-gray-500 truncate">
                              {product.productBrand?.title} •{" "}
                              {product.productCategory?.title}
                            </RText>
                          </div>
                          <RText className="text-xs text-gray-400">
                            Stock: {product.total_stock}
                          </RText>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </Yard>

          {/* Selected Product Preview */}
          {selectedProduct && (
            <Yard className="bg-gray-50 rounded-lg p-4">
              <RText className="text-sm font-medium text-gray-700 mb-2">
                Selected Product
              </RText>
              <Area className="flex items-center space-x-3">
                <img
                  src={selectedProduct.image_url || "/placeholder.svg"}
                  alt={selectedProduct.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <Yard>
                  <RText className="font-medium text-gray-900">
                    {selectedProduct.title}
                  </RText>
                  <RText className="text-sm text-gray-500">
                    {selectedProduct.productBrand?.title} •{" "}
                    {selectedProduct.productCategory?.title}
                  </RText>
                  <RText className="text-sm text-gray-500">
                    Current Stock: {selectedProduct.total_stock}
                  </RText>
                </Yard>
              </Area>
            </Yard>
          )}

          {/* Quantity Input */}
          <Yard>
            <RText className="block text-sm font-medium text-gray-700 mb-2">
              Quantity <span className="text-red-500">*</span>
            </RText>
            <Area className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </Area>
            <RText className="text-sm text-gray-500 mt-1">
              Number of units in this batch
            </RText>
          </Yard>

          {/* Supplier Selection */}
          <Yard>
            <RText className="block text-sm font-medium text-gray-700 mb-2">
              Supplier <span className="text-red-500">*</span>
            </RText>
            <select
              value={selectedSupplierId}
              onChange={(e) => setSelectedSupplierId(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm overflow-hidden text-ellipsis whitespace-nowrap"
              style={{
                maxWidth: "100%",
              }}
              required
              disabled={suppliersLoading}
            >
              <option value="">
                {suppliersLoading
                  ? "Loading suppliers..."
                  : "Select a supplier"}
              </option>
              {suppliers.map((supplier: Supplier) => {
                const fullName = `${supplier.name} - ${supplier.company_name}`;
                const display =
                  fullName.length > 50
                    ? fullName.substring(0, 50) + "..."
                    : fullName;
                return (
                  <option
                    key={supplier.id}
                    value={supplier.id}
                    title={fullName}
                  >
                    {display}
                  </option>
                );
              })}
            </select>
            <RText className="text-sm text-gray-500 mt-1">
              Choose the supplier for this batch
            </RText>
          </Yard>

          {/* Form Actions */}
          <Area className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !selectedProductId ||
                !quantity ||
                !selectedSupplierId
              }
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Yard className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Create Batch</span>
                </>
              )}
            </button>
          </Area>
        </form>
      </Yard>
    </Yard>
  );
}
