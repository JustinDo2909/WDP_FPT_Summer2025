interface Product {
  product_id: number;
  title: string;
  description: string;
  price: number;
  sale_price: number;
  image_url: string[];
  product_category_id: number;
  product_brand_id: number;
  total_stock: number;
  created_at: string;
  updated_at: string;
  ingredients: string;
  how_to_use: string;
  rating: number;
  reviews_count: number;
}

interface Category {
  product_category_id: number;
  title: string;
  description: string;
}

interface Brand {
  product_brand_id: number;
  title: string;
  description: string;
}

interface Review {
  review_id: number;
  product_id: number;
  r_id: string;
  r_name: string;
  r_value: number;
  r_message: string;
  created_at: string;
}

interface Thumbnail {
  color: string;
  label: string;
  border?: boolean;
}

interface NavLink {
  href: string;
  label: string;
}

interface Tab {
  id: string;
  label: string;
}

interface ProductPageData {
  product: Product;
  category: Category;
  brand: Brand;
  reviews: Review[];
  thumbnails: Thumbnail[];
  navLinks: NavLink[];
  breadcrumbItems: string[];
  tabs: Tab[];
}

export type { Product, Category, Brand, Review, Thumbnail, NavLink, Tab, ProductPageData };