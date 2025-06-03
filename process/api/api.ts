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
  tagTypes: ["Products"],
  endpoints: (build) => ({
    //#region getProducts
    getProducts: build.query<any, ProductQueryParams>({
      query: ({ category, brand, page = 1, limit = 20, sort, title}) => {
        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (brand) params.append("brand", brand);
        if (title) params.append("title", title);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (sort) params.append("sort", sort);
        return `/products?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
   //#endregion 
  }),
});


export const cartApi = createApi({
  baseQuery: customBaseQuery, // Assumes cookies are handled here
  reducerPath: "api",
  tagTypes: ["Carts"],
  endpoints: (build) => ({
    //#region getCart
    getCart: build.query<any, void>({
      query: () => ({
        url: "get-cart",
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),
    //#endregion 

    //#region addToCart
    addToCart: build.mutation<any, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "add-cart",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Carts"],
    }),
    //#endregion 

    //#region updateCart
    updateCart: build.mutation<any, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "update-cart",
        method: "PUT",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Carts"],
    }),
    //#endregion 

    //#region removeFromCart
    removeFromCart: build.mutation<any, string>({
      query: (id) => ({
        url: `remove-from-cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),
    //#endregion 
  }),
});


export const { useGetProductsQuery } = api;
export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
