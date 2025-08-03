"use client";

import { useState } from "react";
import { Search, Filter, Package, Plus } from "lucide-react";
import { Area, RText, Yard } from "@/lib/by/Div";
import { useWarehouseLogic } from "@/components/admin/Warehouse/seg/utils";
import { MonthTimeline } from "@/components/admin/Warehouse/month-timeline";
import { BatchCard } from "@/components/admin/Warehouse/Batch-card";
import { BatchDetailModal } from "@/components/admin/Warehouse/Batch-detail-modal";
import { AddBatchModal } from "@/components/admin/Warehouse/Add-batch-modal";
import { WarehouseStats } from "@/components/admin/Warehouse/Warehouse-stats";
import { BatchPagination } from "@/components/admin/Warehouse/Batch-pagination";

export default function WarehousePage() {
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);

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
    isLoading,
    isTimelineLoading,
    setCurrentPage,
    pagination,
  } = useWarehouseLogic();

  const selectedMonthGroup = monthGroups.find(
    (group) => group.month === selectedMonth,
  );

  return (
    <Yard className="p-6 h-screen flex flex-col">
      {/* Page Header */}
      <Area className="flex items-center justify-between mb-6 flex-shrink-0">
        <Yard>
          <RText className="text-2xl font-bold text-gray-900">
            Warehouse Management
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

      {/* Main Content - Fixed layout with timeline on left and scrollable content on right */}
      <Area className="flex gap-6 flex-1 min-h-0">
        {/* Left Sidebar - Fixed Timeline */}
        <Yard className="w-80 flex-shrink-0">
          <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
            <Area className="p-4 border-b border-gray-200 flex-shrink-0">
              <RText className="font-semibold text-gray-900">Timeline</RText>
            </Area>
            <Yard className="flex-1 overflow-y-auto p-2">
              {isTimelineLoading ? (
                <Area className="p-8 text-center">
                  <Yard className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <RText className="text-gray-500">Loading timeline...</RText>
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
                  <RText className="text-gray-500">Loading statistics...</RText>
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                    {selectedMonthGroup.displayName} - Page {pagination.page} of{" "}
                    {pagination.totalPages}
                  </RText>
                )}
              </Area>

              <Yard className="p-4">
                {isLoading ? (
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
                  isLoading={isLoading}
                />
              )}
            </Yard>
          </Yard>
        </Yard>
      </Area>

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
    </Yard>
  );
}
