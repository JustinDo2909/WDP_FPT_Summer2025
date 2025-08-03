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
    volume: number;
    volume_type: string;
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
    id: string;
    user_id: string;
    product_id: string;
    user_name: string;
    review_value: number;
    review_message: string;
    createdAt: string;
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
    postSteps: IPostStep[]; // Core
    warnings: string[]; // Core
    benefits: string[]; // Core
  };

  type IVoucherProduct = {
    product: IProduct;
  };

  type IVoucher = {
    id: string;
    user_id: string;
    voucher_template_id: string;
    event_reward_id: string;
    stripe_coupon_id: string;
    discount_value: number;
    type: "PERCENT" | "AMOUNT";
    redeemed: boolean;
    redeemed_at: string | null;
    expired_at: string | null;
    updated_at: string;
    created_at: string;
    voucherProducts?: IVoucherProduct[];
    voucherTemplate?: IVoucherTemplate;
  };

  type IVoucherTemplate = {
    id: string;
    discount_value: number;
    event_id: string;
    type: "Percent" | "Amount";
    user_limit: string;
    user_count: string;
    is_active: string;
    leaderboard_reward_id:string;
    updated_at: string;
    created_at: string;
    voucherProducts?: IVoucherProduct[];
  }


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
  IVoucherTemplate
};

export type IGame = {
  game_url: string;
  image_url: string;
  title: string;
  description: string;
};

export type ListGame = {
  listGame: IGame[];
  IVoucher: IVoucher;
};

export type ILink = {
  title: string;
  href: string;
};

export type Footer = {
  title: string;
  links: ILink[];
};

export type FooterProps = {
  footers: Footer[];
};
