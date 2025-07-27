"use client";

import { useState, useEffect, useMemo } from "react";
import { useGetProductsQuery, useGetAllBatchesQuery } from "@/process/api/api";
import type {
  Batch,
  BatchWithStatus,
  MonthGroup,
  WarehouseStats,
  BatchPaginationParams,
} from "@/types/warehouse/index";
import type { Product } from "@/types/productManagement/index";

export { type MonthGroup, type WarehouseStats } from "@/types/warehouse/index";

export function useWarehouseLogic() {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<BatchWithStatus | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Prepare API parameters
  const batchParams: BatchPaginationParams = {
    search: searchTerm || undefined,
    month: selectedMonth || undefined,
    isExpired:
      statusFilter === "expired"
        ? true
        : statusFilter === "active"
          ? false
          : undefined,
    page: currentPage,
    limit: 10,
  };

  // Fetch paginated batches using the new API
  const { data: paginatedResponse, isLoading: batchesLoading } =
    useGetAllBatchesQuery(batchParams);

  // Fetch all batches for timeline (with high limit to get all) - we need this for month grouping
  const { data: allBatchesResponse, isLoading: timelineLoading } =
    useGetAllBatchesQuery({
      limit: 10000, // High limit to get all batches for timeline counting
    });

  // Fetch products for product info lookup
  const { data: productsResponse, isLoading: productsLoading } =
    useGetProductsQuery({
      page: 1,
      pageSize: 1000, // Get all products
    });

  const products = productsResponse?.products || [];
  const currentBatches = paginatedResponse?.batches || [];
  const allBatches = allBatchesResponse?.batches || [];
  const pagination = paginatedResponse?.pagination;

  const isLoading = productsLoading || batchesLoading;
  const isTimelineLoading = productsLoading || timelineLoading;

  // Transform current page batches to include status and discount
  const batchesWithStatus = useMemo((): BatchWithStatus[] => {
    return currentBatches.map((batch: Batch) => {
      const now = new Date();
      const expireDate = new Date(batch.expired_at);

      let status: "active" | "expired" | "out-of-stock" = "active";
      let discount: number | undefined;

      // Determine status
      if (batch.current_stock <= 0) {
        status = "out-of-stock";
      } else if (expireDate <= now) {
        status = "expired";
      }

      // Add discount for items expiring soon (within 30 days)
      const daysUntilExpiry = Math.ceil(
        (expireDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (status === "active" && daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
        discount = Math.min(
          50,
          Math.max(10, Math.floor((30 - daysUntilExpiry) * 2)),
        );
      }

      return {
        ...batch,
        status,
        discount,
      };
    });
  }, [currentBatches]);

  // Group ALL batches by month for timeline (not paginated)
  const monthGroups = useMemo(() => {
    const groups: { [key: string]: Batch[] } = {};

    allBatches.forEach((batch) => {
      const date = new Date(batch.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(batch);
    });

    const monthGroupsArray: MonthGroup[] = Object.entries(groups)
      .map(([monthKey, batches]) => {
        const [year, month] = monthKey.split("-");
        const date = new Date(
          Number.parseInt(year),
          Number.parseInt(month) - 1,
        );
        const displayName = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });

        return {
          month: monthKey,
          displayName,
          totalBatches: batches.length,
          batches: [], // We don't need batches here for timeline, just counts
        };
      })
      .sort((a, b) => b.month.localeCompare(a.month)); // Sort by month descending

    return monthGroupsArray;
  }, [allBatches]);

  // Set current month as default
  useEffect(() => {
    if (monthGroups.length > 0 && !selectedMonth) {
      const currentDate = new Date();
      const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

      // Find current month or use the latest month
      const currentMonthGroup = monthGroups.find(
        (group) => group.month === currentMonthKey,
      );
      setSelectedMonth(
        currentMonthGroup ? currentMonthKey : monthGroups[0].month,
      );
    }
  }, [monthGroups, selectedMonth]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, searchTerm, statusFilter]);

  // Calculate month statistics for selected month using all batches
  const monthStats = useMemo((): WarehouseStats | null => {
    if (!selectedMonth || allBatches.length === 0) return null;

    const selectedMonthBatches = allBatches.filter((batch) => {
      const date = new Date(batch.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      return monthKey === selectedMonth;
    });

    if (selectedMonthBatches.length === 0) return null;

    // Transform to BatchWithStatus for status calculation
    const batchesWithStatus = selectedMonthBatches.map((batch) => {
      const now = new Date();
      const expireDate = new Date(batch.expired_at);

      let status: "active" | "expired" | "out-of-stock" = "active";

      if (batch.current_stock <= 0) {
        status = "out-of-stock";
      } else if (expireDate <= now) {
        status = "expired";
      }

      return { ...batch, status };
    });

    const totalBatches = batchesWithStatus.length;
    const activeBatches = batchesWithStatus.filter(
      (batch) => batch.status === "active",
    ).length;
    const expiredBatches = batchesWithStatus.filter(
      (batch) => batch.status === "expired",
    ).length;
    const outOfStockBatches = batchesWithStatus.filter(
      (batch) => batch.status === "out-of-stock",
    ).length;

    const totalQuantity = batchesWithStatus.reduce(
      (sum, batch) => sum + batch.quantity,
      0,
    );
    const totalStock = batchesWithStatus.reduce(
      (sum, batch) => sum + batch.current_stock,
      0,
    );
    const stockPercentage =
      totalQuantity > 0 ? Math.round((totalStock / totalQuantity) * 100) : 0;

    return {
      totalBatches,
      activeBatches,
      expiredBatches,
      outOfStockBatches,
      totalStock,
      totalQuantity,
      stockPercentage,
    };
  }, [allBatches, selectedMonth]);

  // Get product info
  const getProductInfo = (productId: string): Product | undefined => {
    return products.find((product: Product) => product.id === productId);
  };

  return {
    monthGroups,
    selectedMonth,
    setSelectedMonth,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredBatches: batchesWithStatus,
    selectedBatch,
    setSelectedBatch,
    getProductInfo,
    monthStats,
    isLoading,
    isTimelineLoading,
    // Pagination
    currentPage,
    setCurrentPage,
    pagination,
  };
}
