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
import type {
  MetaDataResponse,
  CategoryOption,
  BrandOption,
  SkinTypeOption,
  ItemRequest,
  SimpleApiResponse,
} from "@/types/meta/index";
import type {
  Product,
  ProductsResponse,
  ProductQueryParams,
  ProductMetaResponse,
} from "@/types/productManagement/index";
import type { OrdersResponse, OrderDetailResponse } from "@/types/order/index";
import type {
  Event,
  Question,
  EventReward,
  EventsResponse,
  EventResponse,
  QuestionsResponse,
  RewardsResponse,
  ApiResponse,
  CreateEventRequest,
  UpdateEventRequest,
  CreateQuestionRequest,
  UpdateQuestionRequest,
  CreateRewardRequest,
  UpdateRewardRequest,
} from "@/types/event";
import type { Voucher, VouchersResponse } from "@/types/voucher/index";
import type {
  Batch,
  BatchesResponse,
  CreateBatchRequest,
  CreateBatchResponse,
  PaginatedBatchesResponse,
  BatchPaginationParams,
} from "@/types/warehouse/index";

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
  tagTypes: [
    "Products",
    "Categories",
    "Brands",
    "SkinTypes",
    "Meta",
    "ProductMeta",
    "Orders",
    "OrderDetail",
    "Event",
    "Question",
    "Reward",
    "Vouchers",
    "Questions",
    "Rewards",
    "Reviews",
    "Batches",
  ],
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
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    //#endregion

    //#region getReviewsById
    getReviewsById: build.query<IResponse<IReview, "reviews">, string>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    //#endregion

    //#region getOrderById
    getOrderById: build.query<IResponse<IOrder, "order">, string>({
      query: (id) => ({
        url: `orders/details/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    //#endregion

    //#region postReview
    postReview: build.mutation<
      IReview,
      { productId: string; reviewValue: number; reviewMessage: string }
    >({
      query: (payload) => ({
        url: `reviews/add`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
    //#region Warehouse - Batches
    getAllBatches: build.query<PaginatedBatchesResponse, BatchPaginationParams>(
      {
        query: (params = {}) => {
          const searchParams = new URLSearchParams();

          if (params.search) searchParams.append("search", params.search);
          if (params.month) searchParams.append("month", params.month);
          if (params.isExpired !== undefined)
            searchParams.append("isExpired", params.isExpired.toString());
          if (params.page !== undefined)
            searchParams.append("page", params.page.toString());
          if (params.limit !== undefined)
            searchParams.append("limit", params.limit.toString());

          const queryString = searchParams.toString();
          return `/products/batches${queryString ? `?${queryString}` : ""}`;
        },
        providesTags: ["Batches"],
        keepUnusedDataFor: 60, // 1 minute cache for paginated data
      }
    ),

    getProductBatches: build.query<Batch[], string>({
      query: (productId) => `/products/${productId}/batches`,
      transformResponse: (response: BatchesResponse) => response.batches,
      providesTags: (result, error, productId) => [
        { type: "Batches", id: productId },
        "Batches",
      ],
    }),

    createProductBatch: build.mutation<
      CreateBatchResponse,
      { productId: string; data: CreateBatchRequest }
    >({
      query: ({ productId, data }) => ({
        url: `/products/${productId}/batches`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Batches", id: productId },
        "Batches",
        "Products", // Also invalidate products cache in case batch creation affects inventory
      ],
    }),
    //#endregion
  }),
});

export const {
  useGetProductsQuery,
  useGetEventRewardsQuery,
  usePostAnswerMutation,
  useGetRandomQuestionQuery,
  useGetAllVouchersQuery,
  useGetOrderByIdQuery,
  useLazyGetReviewsByIdQuery,
  usePostReviewMutation,

  // Warehouse - Batches
  useGetAllBatchesQuery,
  useGetProductBatchesQuery,
  useCreateProductBatchMutation,
} = api;

// import { Api, BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";
// import { toast } from "sonner";

// const customBaseQuery = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   extraOptions: any
// ) => {
//   const baseQuery = fetchBaseQuery({
//     baseUrl: "https://cosme-play-be.vercel.app/api/",
//     credentials: "include",
//     prepareHeaders: async (headers) => {
//       const token = Cookies.get("authToken");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   });

//   try {
//     const result: any = await baseQuery(args, api, extraOptions);

//     if (result.error) {
//       const errorMessage = result.error.data?.message || "An error occurred";
//       toast.error(`Error: ${errorMessage}`);
//       return { error: result.error }; // Trả về lỗi ngay lập tức
//     }

//     return result; // ✅ Không truy cập result.data.data
//   } catch (error) {
//     return {
//       error: {
//         status: "FETCH_ERROR",
//         error: (error as Error).message || "Unknown error",
//       },
//     };
//   }
// };
