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
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const now = new Date();

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

  const { data: paginatedResponse, isLoading: batchesLoading } =
    useGetAllBatchesQuery(batchParams);

  const { data: allBatchesResponse, isLoading: timelineLoading } =
    useGetAllBatchesQuery({
      limit: 10000,
    });

  const { data: productsResponse, isLoading: productsLoading } =
    useGetProductsQuery({
      page: 1,
      pageSize: 1000,
    });

  const products = productsResponse?.products || [];
  const currentBatches = paginatedResponse?.batches || [];
  const allBatches = allBatchesResponse?.batches || [];
  const pagination = paginatedResponse?.pagination;

  const isLoading = productsLoading || batchesLoading;
  const isTimelineLoading = productsLoading || timelineLoading;

  const batchesWithStatus = useMemo((): BatchWithStatus[] => {
    return currentBatches.map((batch: Batch) => {
      const expireDate = new Date(batch.expired_at);
      let status: "active" | "expired" = "active";

      if (expireDate <= now) {
        status = "expired";
      }

      return {
        ...batch,
        status,
      };
    });
  }, [currentBatches]);

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
        const date = new Date(Number(year), Number(month) - 1);
        const displayName = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });

        return {
          month: monthKey,
          displayName,
          totalBatches: batches.length,
          batches: [],
        };
      })
      .sort((a, b) => b.month.localeCompare(a.month));

    return monthGroupsArray;
  }, [allBatches]);

  useEffect(() => {
    if (monthGroups.length > 0 && !selectedMonth) {
      const currentDate = new Date();
      const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
      const currentMonthGroup = monthGroups.find(
        (group) => group.month === currentMonthKey
      );
      setSelectedMonth(
        currentMonthGroup ? currentMonthKey : monthGroups[0].month
      );
    }
  }, [monthGroups, selectedMonth]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, searchTerm, statusFilter]);

  const monthStats = useMemo((): WarehouseStats | null => {
    if (!selectedMonth || allBatches.length === 0) return null;

    const selectedMonthBatches = allBatches.filter((batch) => {
      const date = new Date(batch.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      return monthKey === selectedMonth;
    });

    if (selectedMonthBatches.length === 0) return null;

    const batchesWithStatus = selectedMonthBatches.map((batch) => {
      const expireDate = new Date(batch.expired_at);
      let status: "active" | "expired" = "active";

      if (expireDate <= now) {
        status = "expired";
      }

      return { ...batch, status };
    });

    const totalBatches = batchesWithStatus.length;
    const activeBatches = batchesWithStatus.filter(
      (b) => b.status === "active"
    ).length;
    const expiredBatches = batchesWithStatus.filter(
      (b) => b.status === "expired"
    ).length;

    const totalQuantity = batchesWithStatus.reduce(
      (sum, b) => sum + b.quantity,
      0
    );
    const totalStock = batchesWithStatus.reduce(
      (sum, b) => sum + b.current_stock,
      0
    );
    const stockPercentage =
      totalQuantity > 0 ? Math.round((totalStock / totalQuantity) * 100) : 0;

    return {
      totalBatches,
      activeBatches,
      expiredBatches,
      totalQuantity,
      totalStock,
      stockPercentage,
    };
  }, [allBatches, selectedMonth]);

  const getProductInfo = (productId: string): Product | undefined => {
    return products.find((p: Product) => p.id === productId);
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
    currentPage,
    setCurrentPage,
    pagination,
  };
}
