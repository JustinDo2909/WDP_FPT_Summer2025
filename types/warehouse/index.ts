export interface Supplier {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  company_name: string;
  note: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  sale_price: number;
  image_url: string;
  images: string[];
  rating: number;
  total_stock: number;
  product_category_id: string;
  product_brand_id: string;
  product_skinType_id: string;
  stripe_product_id: string;
  stripe_price_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Batch {
  id: string;
  product_id: string;
  user_id: string;
  supplier_id: string;
  quantity: number;
  current_stock: number;
  expired_at: string;
  created_at: string;
  product?: Product;
  supplier?: Supplier;
  user?: User;
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
  supplier_id: string;
}

export interface CreateBatchResponse {
  success: boolean;
  batch: Batch;
}

export interface BatchWithStatus extends Batch {
  status: "active" | "expired";
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
