export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  sale_price: number;
  image_url: string;
  rating: number;
  total_stock: number;
  product_category_id: string;
  product_brand_id: string;
  product_skinType_id: string;
  createdAt: string;
  updatedAt: string;
  productCategory: {
    title: string;
    description: string;
  };
  productBrand: {
    title: string;
    description: string;
  };
  productSkinType: {
    title: string;
    description: string;
  };
}

export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  sale_price: string;
  image_url: string;
  product_category_id: string;
  product_brand_id: string;
  product_skinType_id: string;
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    product: Omit<
      Product,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "productCategory"
      | "productBrand"
      | "productSkinType"
    >,
  ) => void;
  editProduct?: Product | null;
}

export interface ProductTableProps {
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  title?: string;
  category?: string;
  brand?: string;
  skinType?: string;
  limit?: number;
  sort?: string;
  sale?: string;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface CategoryOption {
  id: string;
  title: string;
  description: string;
}

export interface BrandOption {
  id: string;
  title: string;
  description: string;
}

export interface SkinTypeOption {
  id: string;
  title: string;
  description: string;
}

export interface ProductMetaResponse {
  success: boolean;
  data: {
    categories: CategoryOption[];
    brands: BrandOption[];
    skinTypes: SkinTypeOption[];
  };
}
