"use client";

import { useState } from "react";
import { ProductTable } from "@/components/admin/Product/product-table";
import { AddProductModal } from "@/components/admin/Product/add-product-modal";
import { useProductsLogic } from "@/components/admin/Product/seg/utils";
import { Area, RText, Core, Container, Yard } from "@/lib/by/Div";
import { StatsCard } from "@/components/admin/StatsCard";
import {
  Package,
  AlertTriangle,
  Grid3X3,
  Building2,
  Warehouse,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { useGetProductsQuery, useGetProductMetaQuery } from "@/process/api/api";
import type { Product } from "@/types/productManagement/index";

// Warehouse components
import { useWarehouseLogic } from "@/components/admin/Warehouse/seg/utils";
import { MonthTimeline } from "@/components/admin/Warehouse/month-timeline";
import { BatchCard } from "@/components/admin/Warehouse/Batch-card";
import { BatchDetailModal } from "@/components/admin/Warehouse/Batch-detail-modal";
import { AddBatchModal } from "@/components/admin/Warehouse/Add-batch-modal";
import { WarehouseStats } from "@/components/admin/Warehouse/Warehouse-stats";
import { BatchPagination } from "@/components/admin/Warehouse/Batch-pagination";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"products" | "stockManagement">(
    "products"
  );
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);

  const {
    isModalOpen,
    editingProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmitProduct,
    handleCloseModal,
  } = useProductsLogic();

  // Warehouse logic
  const {
    monthGroups,
    selectedMonth,
    setSelectedMonth,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredBatches,
    selectedBatch,
    setSelectedBatch,
    getProductInfo,
    monthStats,
    isLoading: isWarehouseLoading,
    isTimelineLoading,
    setCurrentPage,
    pagination,
  } = useWarehouseLogic();

  const selectedMonthGroup = monthGroups.find(
    (group) => group.month === selectedMonth
  );

  // Get products data for stats calculation with smaller dataset
  const { data: productsData, isLoading: isStatsLoading } = useGetProductsQuery(
    {
      page: 1,
      pageSize: 50,
    },
    {
      // Cache for 5 minutes to improve performance
      pollingInterval: 300000,
      refetchOnMountOrArgChange: 30,
    },
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
      products.map((p: Product) => p.productCategory.title),
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
        {/* Content based on active tab */}
        {activeTab === "products" ? (
          <Area className="space-y-6">
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

            {/* Tab Navigation */}
            <Area className="bg-white border-b rounded-lg shadow-sm">
              <Area className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "products"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Area className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Products
                  </Area>
                </button>
                <button
                  onClick={() => setActiveTab("stockManagement")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "stockManagement"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Area className="flex items-center gap-2">
                    <Warehouse className="w-4 h-4" />
                    Stock Management
                  </Area>
                </button>
              </Area>
            </Area>

            {/* Product Table */}
            <ProductTable
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </Area>
        ) : (
          <Area className="space-y-6">
            {/* Stock Management Header */}
            <Area className="flex items-center justify-between">
              <Yard>
                <RText className="text-2xl font-bold text-gray-900">
                  Stock Management
                </RText>
                <RText className="text-gray-600">
                  Track and manage inventory batches
                </RText>
              </Yard>

              <button
                onClick={() => setShowAddBatchModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Batch</span>
              </button>
            </Area>

            {/* Tab Navigation */}
            <Area className="bg-white border-b rounded-lg shadow-sm">
              <Area className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "products"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Area className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Products
                  </Area>
                </button>
                <button
                  onClick={() => setActiveTab("stockManagement")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "stockManagement"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Area className="flex items-center gap-2">
                    <Warehouse className="w-4 h-4" />
                    Stock Management
                  </Area>
                </button>
              </Area>
            </Area>

            {/* Main Content - Fixed layout with timeline on left and scrollable content on right */}
            <Area className="flex gap-6 flex-1 min-h-0">
              {/* Left Sidebar - Fixed Timeline */}
              <Yard className="w-80 flex-shrink-0">
                <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
                  <Area className="p-4 border-b border-gray-200 flex-shrink-0">
                    <RText className="font-semibold text-gray-900">
                      Timeline
                    </RText>
                  </Area>
                  <Yard className="flex-1 overflow-y-auto p-2">
                    {isTimelineLoading ? (
                      <Area className="p-8 text-center">
                        <Yard className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <RText className="text-gray-500">
                          Loading timeline...
                        </RText>
                      </Area>
                    ) : (
                      <MonthTimeline
                        monthGroups={monthGroups}
                        selectedMonth={selectedMonth}
                        onMonthSelect={setSelectedMonth}
                      />
                    )}
                  </Yard>
                </Yard>
              </Yard>

              {/* Right Content - Scrollable Monthly Overview */}
              <Yard className="flex-1 overflow-y-auto">
                <Yard className="space-y-6 pb-6">
                  {/* Stats */}
                  {isTimelineLoading ? (
                    <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                      <Area className="text-center">
                        <Yard className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <RText className="text-gray-500">
                          Loading statistics...
                        </RText>
                      </Area>
                    </Yard>
                  ) : monthStats && selectedMonthGroup ? (
                    <WarehouseStats
                      stats={monthStats}
                      monthName={selectedMonthGroup.displayName}
                    />
                  ) : null}

                  {/* Filters */}
                  <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <Area className="flex flex-col sm:flex-row gap-4">
                      {/* Search */}
                      <Yard className="flex-1">
                        <Area className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={isWarehouseLoading}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </Area>
                      </Yard>

                      {/* Status Filter */}
                      <Yard className="sm:w-48">
                        <Area className="relative">
                          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            disabled={isWarehouseLoading}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="expired">Expired Soon</option>
                          </select>
                        </Area>
                      </Yard>
                    </Area>
                  </Yard>

                  {/* Batch List - Full height display without container restrictions */}
                  <Yard className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <Area className="p-4 border-b border-gray-200">
                      <RText className="font-semibold text-gray-900">
                        Batch List {pagination && `(${pagination.total} total)`}
                      </RText>
                      {selectedMonthGroup && pagination && (
                        <RText className="text-sm text-gray-500">
                          {selectedMonthGroup.displayName} - Page{" "}
                          {pagination.page} of {pagination.totalPages}
                        </RText>
                      )}
                    </Area>

                    <Yard className="p-4">
                      {isWarehouseLoading ? (
                        <Area className="text-center py-12">
                          <Yard className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <RText className="text-lg font-medium text-gray-500 mb-2">
                            Loading batches...
                          </RText>
                          <RText className="text-gray-400">
                            Fetching paginated data
                          </RText>
                        </Area>
                      ) : filteredBatches.length > 0 ? (
                        <Yard className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {filteredBatches.map((batch) => (
                            <BatchCard
                              key={batch.id}
                              batch={batch}
                              product={getProductInfo(batch.product_id)}
                              onClick={() => setSelectedBatch(batch)}
                            />
                          ))}
                        </Yard>
                      ) : (
                        <Area className="text-center py-12">
                          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <RText className="text-lg font-medium text-gray-500 mb-2">
                            No batches found
                          </RText>
                          <RText className="text-gray-400">
                            {searchTerm || statusFilter
                              ? "Try changing your search filters"
                              : "No batches available for this month"}
                          </RText>
                        </Area>
                      )}
                    </Yard>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                      <BatchPagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        total={pagination.total}
                        limit={pagination.limit}
                        onPageChange={setCurrentPage}
                        isLoading={isWarehouseLoading}
                      />
                    )}
                  </Yard>
                </Yard>
              </Yard>
            </Area>
          </Area>
        )}
      </Container>

      {/* Add/Edit Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        editProduct={editingProduct}
      />

      {/* Warehouse Modals */}
      {/* Batch Detail Modal */}
      {selectedBatch && (
        <BatchDetailModal
          batch={selectedBatch}
          product={getProductInfo(selectedBatch.product_id)}
          isOpen={!!selectedBatch}
          onClose={() => setSelectedBatch(null)}
        />
      )}

      {/* Add Batch Modal */}
      <AddBatchModal
        isOpen={showAddBatchModal}
        onClose={() => setShowAddBatchModal(false)}
        onSuccess={() => {
          // Batch created successfully, data will be refetched automatically
        }}
      />
    </Core>
  );
}
