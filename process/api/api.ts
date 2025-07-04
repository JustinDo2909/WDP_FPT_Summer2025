import {
  IEventRewards,
  IQuestions,
  IResponseCalculate,
  IResponseEventRewards,
  IResponseQuestions,
  IReward,
} from "@/types/quiz";
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
  tagTypes: ["Products", "Questions", "Rewards", "Vouchers"],
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
        sale,
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        // params.append("pageSize", pageSize.toString());
        if (title) params.append("title", title);
        if (category) params.append("category", category);
        if (brand) params.append("brand", brand);
        if (skinType) params.append("skinType", skinType);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (sort) params.append("sort", sort);
        if (sale) params.append("sale", sale);
        return `/products?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
    //#endregion
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

    //#region getRandomQuestion
    getRandomQuestion: build.query<IQuestions[], void>({
      query: () => ({
        url: "events/1/questions/random",
        method: "GET",
      }),
      transformResponse: (response: IResponseQuestions) =>
        response.questions || [],
      providesTags: ["Questions"],
    }),

    //#endregion
    //#region getRandomQuestion
    getEventRewards: build.query<IEventRewards[], void>({
      query: () => ({
        url: "events/1/rewards",
        method: "GET",
      }),
      transformResponse: (response: IResponseEventRewards) =>
        response.eventRewards || [],
      providesTags: ["Rewards"],
    }),
    //#endregion
    //#region getRandomQuestion
    postAnswer: build.mutation<IReward, { correct_answers: number }>({
      query: (body) => ({
        url: "events/1/calculate-reward",
        method: "POST",
        body,
      }),
      transformResponse: (response: IResponseCalculate) =>
        response.reward || {},
      invalidatesTags: ["Rewards"],
    }),
    //#endregion
    getAllVouchers: build.query<IListResponse<IVoucher, "vouchers">, void>({
      query: () => ({
        url: "vouchers",
        method: "GET",
      }),
      providesTags: ["Vouchers"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetEventRewardsQuery,
  usePostAnswerMutation,
  useGetRandomQuestionQuery,
  useGetAllVouchersQuery,
} = api;
//#region getAllVouchers

//#endregion
