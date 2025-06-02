declare global {
  type IProduct = {
    id: string;
    createdAt: string; // or Date
    updatedAt: string; // or Date
    productCategory: IProductCategory;
    productBrand: IProductBrand;
    title: string;
    description: string;
    price: number;
    sale_price: number;
    image_url: string;
    product_category_id: number;
    product_brand_id: number;
    total_stock: number;
    created_at: string;
    updated_at: string;
    ingredients: string;
    how_to_use: string;
    rating: number;
    reviews_count: number;
  };

  type ICategory = {
    product_category_id: number;
    title: string;
    description: string;
  };

  type IBrand = {
    product_brand_id: number;
    title: string;
    description: string;
  };

  type IReview = {
    review_id: number;
    product_id: number;
    r_id: string;
    r_name: string;
    r_value: number;
    r_message: string;
    created_at: string;
  };

  type IThumbnail = {
    color: string;
    label: string;
    border?: boolean;
  };

  type INavLink = {
    href: string;
    label: string;
  };

  type ITab = {
    id: string;
    label: string;
  };

  type IProductPageData = {
    product: IProduct;
    category: ICategory;
    brand: IBrand;
    reviews: IReview[];
    thumbnails: IThumbnail[];
    navLinks: INavLink[];
    breadcrumbItems: string[];
    tabs: ITab[];
  };
}

type IProductCategory = {
  title: string;
  description: string;
};

type IProductBrand = {
  title: string;
  description: string;
};

export type {
  IProduct,
  ICategory,
  IBrand,
  IReview,
  IThumbnail,
  INavLink,
  ITab,
  IProductPageData,
  IProductCategory,
  IProductBrand
};