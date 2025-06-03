"use client";

import { ProductTable } from "@/components/admin/Product/product-table";
import { AddProductModal } from "@/components/admin/Product/add-product-modal";
import {
  useProductsLogic,
  calculateProductStats,
} from "@/components/admin/Product/seg/utils";
import { Area, RText, Core, Container, Block } from "@/lib/by/Div";
import { getCurrentDate } from "@/components/admin/Dashboard/seg/utils";
import { StatsCard } from "@/components/admin/StatsCard";
import { Package, AlertTriangle, Grid3X3, Building2 } from "lucide-react";

export default function ProductsPage() {
  const {
    products,
    isModalOpen,
    editingProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmitProduct,
    handleCloseModal,
  } = useProductsLogic();

  const stats = calculateProductStats(products);

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Product Management
        </RText>
        <Block className="text-sm text-gray-500">{getCurrentDate()}</Block>
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
            value={stats.totalProducts}
            icon={Package}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
          <StatsCard
            title="Low Stock"
            value={stats.lowStockProducts}
            icon={AlertTriangle}
            iconColor="text-red-600"
            iconBgColor="bg-red-50"
            valueColor="text-red-600"
          />
          <StatsCard
            title="Categories"
            value={stats.totalCategories}
            icon={Grid3X3}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
            valueColor="text-green-600"
          />
          <StatsCard
            title="Brands"
            value={stats.totalBrands}
            icon={Building2}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
            valueColor="text-purple-600"
          />
        </Area>

        {/* Product Table */}
        <ProductTable
          products={products}
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
