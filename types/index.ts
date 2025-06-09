import { IGame } from "./index";
declare global {
  type IProduct = {
    id: string;
    createdAt: string; // or Date
    updatedAt: string; // or Date
    productCategory: IProductCategory;
    productBrand: IProductBrand;
    productSkinType: ISkinType;
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
    id: number;
    title: string;
    description: string;
  };

  type IBrand = {
    id: number;
    title: string;
    description: string;
  };

  type ISkinType = {
    id: number;
    title: string;
    description: string;
  };

  type IProductMeta = {
    categories: ICategory[];
    brands: IBrand[];
    skinTypes: ISkinType[];
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

  type IProductCategory = {
    title: string;
    description: string;
  };

  type IProductBrand = {
    title: string;
    description: string;
  };

  type IPostStep = {
    id: number; // Core
    title: string; // Core
    description: string; // Core
    details: string; // Core
    image_url: string; // Core
    tips: string[]; // Additional
  };

  type IPostData = {
    id: number; // Core
    category: ICategory; //Core
    category_id: string;
    author: IUser; //Core
    product_id: string;
    author_id: string;
    title: string; // Core
    thumbnail_url: string; // Core
    description: string; // Core
    steps: IPostStep[]; // Core
    warnings: string[]; // Core
    benefits: string[]; // Core
  };
}

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
  IProductBrand,
};

export type IGame = {
  game_url: string;
  image_url: string;
  title: string;
  description: string;
};

export type ListGame = {
  listGame: IGame[];
};
