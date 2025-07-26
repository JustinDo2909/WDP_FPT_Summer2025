"use client";

import { useProductsLogic } from "@/components/admin/Product/seg/utils";
import { Area, RText, Core, Container } from "@/lib/by/Div";
import { StatsCard } from "@/components/admin/StatsCard";
import { Package, AlertTriangle, Grid3X3, Building2 } from "lucide-react";
import { useGetProductsQuery, useGetProductMetaQuery } from "@/process/api/api";
import { ProductTable } from "@/components/admin/Product/product-table";
import { AddProductModal } from "@/components/admin/Product/add-product-modal";
import type { Product } from "@/types/productManagement/index";

export default function ProductsPage() {
  const {
    isModalOpen,
    editingProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmitProduct,
    handleCloseModal,
  } = useProductsLogic();

  // Get products data for stats calculation with smaller dataset
  const { data: productsData, isLoading: isStatsLoading } = useGetProductsQuery(
    {
      page: 1,
      pageSize: 50, // Reduced from 1000 to improve performance
    },
    {
      // Cache for 5 minutes to improve performance
      pollingInterval: 300000,
      refetchOnMountOrArgChange: 30,
    }
  );
  const products = productsData?.products || [];

  // Prefetch meta data to speed up modal opening
  useGetProductMetaQuery(undefined, {
    pollingInterval: 600000,
    refetchOnMountOrArgChange: 600,
  });

  // Calculate stats based on available data, or use API totals if available
  const stats = {
    totalProducts: productsData?.pagination?.total || products.length,
    lowStockProducts: products.filter((p: Product) => p.total_stock < 50)
      .length,
    totalCategories: new Set(
      products.map((p: Product) => p.productCategory.title)
    ).size,
    totalBrands: new Set(products.map((p: Product) => p.productBrand.title))
      .size,
  };

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Product Management
        </RText>
      </header>

      {/* Main Content */}
      <Container className="flex-1 overflow-auto p-6 space-y-6">
        {/* Page Title */}
        <Area>
          <RText className="text-gray-600">
            Manage your cosmetics inventory and product catalog
          </RText>
        </Area>

        {/* Stats Cards */}
        <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total Products"
            value={isStatsLoading ? "..." : stats.totalProducts}
            icon={Package}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
          <StatsCard
            title="Low Stock"
            value={isStatsLoading ? "..." : stats.lowStockProducts}
            icon={AlertTriangle}
            iconColor="text-red-600"
            iconBgColor="bg-red-50"
            valueColor="text-red-600"
          />
          <StatsCard
            title="Categories"
            value={isStatsLoading ? "..." : stats.totalCategories}
            icon={Grid3X3}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
            valueColor="text-green-600"
          />
          <StatsCard
            title="Brands"
            value={isStatsLoading ? "..." : stats.totalBrands}
            icon={Building2}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
            valueColor="text-purple-600"
          />
        </Area>

        {/* Product Table */}
        <ProductTable
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </Container>

      {/* Add/Edit Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        editProduct={editingProduct}
      />
    </Core>
  );
}
