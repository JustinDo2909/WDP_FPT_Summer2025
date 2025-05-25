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
    baseUrl: "http://localhost:9999",
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
    getProduct: build.query<any, any>({
      query: () => `/product`,
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductQuery } = api;
