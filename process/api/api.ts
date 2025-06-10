import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Products"],
  endpoints: (build) => ({
    //#region getProducts
    getProducts: build.query<any, ProductQueryParams>({
      query: ({
        category,
        brand,
        skinType,
        page = 1,
        limit = 20,
        sort,
        title,
      }) => {
        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (brand) params.append("brand", brand);
        if (title) params.append("title", title);
        if (skinType) params.append("skinType", skinType);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (sort) params.append("sort", sort);
        return `/products?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
    //#endregion
    //#region getProductsMeta

    getProductMeta: build.query<any, void>({
      query: () => ({
        url: "products/meta",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    //#endregion
  }),
});

export const { useGetProductsQuery } = api;
