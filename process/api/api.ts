import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "sonner";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://cosme-play-be.vercel.app/api/",
    credentials: "include",
    prepareHeaders: async (headers) => {
      const token = Cookies.get("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorMessage = result.error.data?.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
      return { error: result.error }; // Trả về lỗi ngay lập tức
    }

    return result; // ✅ Không truy cập result.data.data
  } catch (error) {
    return {
      error: {
        status: "FETCH_ERROR",
        error: (error as Error).message || "Unknown error",
      },
    };
  }
};


export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Products", "Vouchers"], // Add Vouchers tag if needed
  endpoints: (build) => ({
    //#region getProducts
    getProducts: build.query<any, ProductQueryParams>({
      query: ({ category, brand, skinType, page = 1, limit = 20, sort, title }) => {
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

    //#region getAllVouchers
    getAllVouchers: build.query<IListResponse<IVoucher, 'vouchers'>, void>({
      query: () => ({
        url: "vouchers",
        method: "GET",
      }),
      providesTags: ["Vouchers"],
    }),

    //#endregion
  }),
});





export const { useGetProductsQuery, useGetAllVouchersQuery } = api;

