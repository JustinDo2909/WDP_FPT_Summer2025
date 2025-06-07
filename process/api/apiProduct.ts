import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";
import {
  Product,
  ProductsResponse,
  ProductQueryParams,
  ProductMetaResponse,
} from "@/types/productManagement/index";

export const apiProduct = createApi({
  reducerPath: "apiProduct",
  baseQuery: customBaseQuery,
  tagTypes: ["Products", "ProductMeta"],
  endpoints: (builder) => ({
    // Get products with pagination and filters
    getProducts: builder.query<ProductsResponse, ProductQueryParams>({
      query: ({
        page = 1,
        pageSize = 10,
        title,
        category,
        brand,
        skinType,
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());
        if (title) params.append("title", title);
        if (category) params.append("category", category);
        if (brand) params.append("brand", brand);
        if (skinType) params.append("skinType", skinType);

        return `/products?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),

    // Get product metadata (categories, brands, skin types)
    getProductMeta: builder.query<ProductMetaResponse, void>({
      query: () => "/products/meta",
      providesTags: ["ProductMeta"],
    }),

    // Create new product
    createProduct: builder.mutation<
      { success: boolean; product: Product },
      Omit<
        Product,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "productCategory"
        | "productBrand"
        | "productSkinType"
      >
    >({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update existing product
    updateProduct: builder.mutation<
      { success: boolean; product: Product },
      {
        id: string;
        data: Partial<
          Omit<
            Product,
            | "id"
            | "createdAt"
            | "updatedAt"
            | "productCategory"
            | "productBrand"
            | "productSkinType"
          >
        >;
      }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // Delete product
    deleteProduct: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // Get single product by ID
    getProductById: builder.query<
      { success: boolean; product: Product },
      string
    >({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductMetaQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} = apiProduct;
