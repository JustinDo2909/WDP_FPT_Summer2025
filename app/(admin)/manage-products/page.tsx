"use client";

import { useState } from "react";
import { ProductTable } from "@/components/admin/ProductManagement/product-table";
import { AddProductModal } from "@/components/admin/ProductManagement/add-product-modal";
import {
  useProductsLogic,
  calculateProductStats,
} from "@/components/admin/ProductManagement/seg/utils";
import { Area, RText, Yard, Core, Container, Block } from "@/lib/by/Div";
import { Sidebar } from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";
import { getCurrentDate } from "@/components/admin/Dashboard/seg/utils";

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <Core className="flex h-screen bg-gray-50">
      <Sidebar />

      <Container className="flex-1 flex flex-col overflow-hidden">
        {/* Header giống Dashboard */}
        <header className="flex h-16 items-center gap-2 border-b bg-white px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Yard className="flex items-center gap-2 text-sm text-gray-500">
            <RText>Product Management</RText>
          </Yard>
          <Yard className="ml-auto flex items-center space-x-4">
            <Block className="text-sm text-gray-500">{getCurrentDate()}</Block>
          </Yard>
        </header>

        {/* Nội dung chính */}
        <Area className="flex-1 space-y-6 p-6 overflow-auto">
          {/* Page Title */}
          <Area>
            <RText className="text-3xl font-bold text-gray-900 mb-2">
              Products Management
            </RText>
            <RText className="text-gray-600">
              Manage your cosmetics inventory and product catalog
            </RText>
          </Area>

          {/* Stats Cards */}
          <Area className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Yard className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <RText className="text-sm font-medium text-gray-500">
                Total Products
              </RText>
              <RText className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalProducts}
              </RText>
            </Yard>
            <Yard className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <RText className="text-sm font-medium text-gray-500">
                Low Stock
              </RText>
              <RText className="text-2xl font-bold text-red-600 mt-1">
                {stats.lowStockProducts}
              </RText>
            </Yard>
            <Yard className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <RText className="text-sm font-medium text-gray-500">
                Categories
              </RText>
              <RText className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalCategories}
              </RText>
            </Yard>
            <Yard className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <RText className="text-sm font-medium text-gray-500">
                Brands
              </RText>
              <RText className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalBrands}
              </RText>
            </Yard>
          </Area>

          {/* Products Table */}
          <ProductTable
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </Area>
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
