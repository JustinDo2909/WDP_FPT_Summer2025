export interface Batch {
  id: string;
  product_id: string;
  quantity: number;
  current_stock: number;
  expired_at: string;
  created_at: string;
}

export interface BatchesResponse {
  success: boolean;
  batches: Batch[];
}

// Pagination types
export interface BatchPaginationParams {
  search?: string;
  month?: string;
  isExpired?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedBatchesResponse {
  success: boolean;
  batches: Batch[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateBatchRequest {
  quantity: number;
}

export interface CreateBatchResponse {
  success: boolean;
  batch: Batch;
}

export interface BatchWithStatus extends Batch {
  status: "active" | "expired" | "out-of-stock";
  discount?: number;
}

export interface MonthGroup {
  month: string;
  displayName: string;
  totalBatches: number;
  batches: BatchWithStatus[];
}

export interface WarehouseStats {
  totalBatches: number;
  activeBatches: number;
  expiredBatches: number;
  outOfStockBatches: number;
  totalStock: number;
  totalQuantity: number;
  stockPercentage: number;
}
