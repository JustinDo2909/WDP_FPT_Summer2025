import { fetcher } from "@/process/helper/fetcher";

// Converts object to query string
function toQueryString(params: Record<string, string | undefined>) {
  return Object.entries(params)
    .filter(([v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v!)}`)
    .join("&");
}

export async function fetchProducts(params: {
  category?: string;
  brand?: string;
  page?: string;
  skinType?: string;
  limit?: string;
  sort?: string;
}) {
  const query = toQueryString({
    category: params.category,
    brand: params.brand,
    skinType: params.skinType,
    page: params.page || "1",
    limit: params.limit || "10",
    sort: params.sort,
  });

  try {
    return await fetcher(`/products?${query}`, { revalidate: 60 });
  } catch {
    return { products: [], total: 0, page: 1, totalPages: 0 };
  }
}

export async function fetchProductMeta() {
  try {
    return await fetcher("/products/meta", { revalidate: 60 });
  } catch {
    return { products: [], total: 0, page: 1, totalPages: 0 };
  }
}
