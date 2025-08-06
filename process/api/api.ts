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
  LeaderboardReward,
  LeaderboardRewardsResponse,
  LeaderboardRewardResponse,
  CreateLeaderboardRewardRequest,
  UpdateLeaderboardRewardRequest,
  AddVoucherTemplateToRewardRequest,
} from "@/types/event";
import type {
  Voucher,
  VouchersResponse,
  VoucherTemplate,
  VoucherTemplatesResponse,
  VoucherTemplateResponse,
  CreateVoucherTemplateRequest,
  UpdateVoucherTemplateRequest,
  VoucherTemplateFilterParams,
} from "@/types/voucher/index";
import type {
  Batch,
  BatchesResponse,
  CreateBatchRequest,
  CreateBatchResponse,
  PaginatedBatchesResponse,
  BatchPaginationParams,
  Supplier,
} from "@/types/warehouse/index";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/`,
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
    "VoucherTemplates",
    "Questions",
    "Rewards",
    "LeaderboardRewards",
    "Reviews",
    "Batches",
    "Suppliers",
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

    //#region Leaderboard Rewards
    getLeaderboardRewards: build.query<
      LeaderboardReward[],
      { eventId: string }
    >({
      query: ({ eventId }) => `/events/${eventId}/rewards`,
      transformResponse: (response: LeaderboardRewardsResponse) =>
        response.rewards,
      providesTags: ["LeaderboardRewards"],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    getLeaderboardRewardById: build.query<
      LeaderboardReward,
      { eventId: string; rewardId: string }
    >({
      query: ({ eventId, rewardId }) =>
        `/events/${eventId}/rewards/${rewardId}`,
      transformResponse: (response: LeaderboardRewardResponse) =>
        response.reward,
      providesTags: ["LeaderboardRewards"],
    }),

    createLeaderboardReward: build.mutation<
      LeaderboardReward,
      { eventId: string; data: CreateLeaderboardRewardRequest }
    >({
      query: ({ eventId, data }) => ({
        url: `/events/${eventId}/rewards`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: LeaderboardRewardResponse) =>
        response.reward,
      invalidatesTags: ["LeaderboardRewards"],
    }),

    updateLeaderboardReward: build.mutation<
      LeaderboardReward,
      {
        eventId: string;
        rewardId: string;
        data: UpdateLeaderboardRewardRequest;
      }
    >({
      query: ({ eventId, rewardId, data }) => ({
        url: `/events/${eventId}/rewards/${rewardId}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: LeaderboardRewardResponse) =>
        response.reward,
      invalidatesTags: ["LeaderboardRewards"],
    }),

    deleteLeaderboardReward: build.mutation<
      void,
      { eventId: string; rewardId: string }
    >({
      query: ({ eventId, rewardId }) => ({
        url: `/events/${eventId}/rewards/${rewardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LeaderboardRewards"],
    }),

    addVoucherTemplateToReward: build.mutation<
      LeaderboardReward,
      {
        eventId: string;
        rewardId: string;
        data: AddVoucherTemplateToRewardRequest;
      }
    >({
      query: ({ eventId, rewardId, data }) => ({
        url: `/events/${eventId}/rewards/${rewardId}/vouchers`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: LeaderboardRewardResponse) =>
        response.reward,
      invalidatesTags: ["LeaderboardRewards"],
    }),
    //#endregion

    //#region getEventLeaderboard
    getEventLeaderboard: build.query<
      IResponse<ILeaderBoardData, "data">,
      string
    >({
      query: (event_id) => ({
        url: `events/${event_id}/leaderboard`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Event"],
    }),
    //#endregion

    //#region calculateReward
    calculateReward: build.mutation<
      EventReward,
      { eventId: string; correct_answers: number }
    >({
      query: ({ eventId, correct_answers }) => ({
        url: `events/${eventId}/calculate-reward`,
        method: "POST",
        body: { correct_answers },
      }),
      // transformResponse: (response: IResponseCalculate) =>
      //   response.reward || {},
      invalidatesTags: ["Event"],
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
    getReviewsById: build.query<IResponse<IReview[], "reviews">, string>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
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

    //#region Suppliers
    getSuppliers: build.query<Supplier[], void>({
      query: () => "/suppliers",
      providesTags: ["Suppliers"],
    }),
    //#endregion

    getProductMeta: build.query<ProductMetaResponse, void>({
      query: () => "/products/meta",
      providesTags: ["ProductMeta"],
    }),

    createProduct: build.mutation<
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
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(api.util.invalidateTags(["Products"]));
        } catch {}
      },
    }),

    updateProduct: build.mutation<
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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(api.util.invalidateTags(["Products"]));
        } catch {}
      },
    }),

    deleteProduct: build.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    getProductById: build.query<{ success: boolean; product: Product }, string>(
      {
        query: (id) => `/products/${id}`,
        providesTags: ["Products"],
      }
    ),
    //#endregion

    //#region Meta Data
    getMetaData: build.query<MetaDataResponse, void>({
      query: () => "/products/meta",
      providesTags: ["Meta", "Categories", "Brands", "SkinTypes"],
      keepUnusedDataFor: 600,
    }),

    createCategory: build.mutation<
      SimpleApiResponse,
      Omit<CategoryOption, "id">
    >({
      query: (categoryData) => ({
        url: "/products/meta",
        method: "POST",
        body: {
          ...categoryData,
          type: "category",
        } as ItemRequest,
      }),
      invalidatesTags: ["Categories", "Meta"],
    }),

    updateCategory: build.mutation<SimpleApiResponse, CategoryOption>({
      query: ({ id, ...categoryData }) => ({
        url: `/products/meta/${id}`,
        method: "PUT",
        body: {
          ...categoryData,
          type: "category",
        } as ItemRequest,
      }),
      async onQueryStarted(
        { id, ...categoryData },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getMetaData", undefined, (draft) => {
            if (draft?.data?.categories) {
              const categoryIndex = draft.data.categories.findIndex(
                (cat) => cat.id === id
              );
              if (categoryIndex !== -1) {
                draft.data.categories[categoryIndex] = { id, ...categoryData };
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Categories", "Meta"],
    }),

    deleteCategory: build.mutation<SimpleApiResponse, CategoryOption>({
      query: ({ id, ...categoryData }) => ({
        url: `/products/meta/${id}`,
        method: "DELETE",
        body: {
          ...categoryData,
          type: "category",
        } as ItemRequest,
      }),
      invalidatesTags: ["Categories", "Meta"],
    }),

    createBrand: build.mutation<SimpleApiResponse, Omit<BrandOption, "id">>({
      query: (brandData) => ({
        url: "/products/meta",
        method: "POST",
        body: {
          ...brandData,
          type: "brand",
        } as ItemRequest,
      }),
      invalidatesTags: ["Brands", "Meta"],
    }),

    updateBrand: build.mutation<SimpleApiResponse, BrandOption>({
      query: ({ id, ...brandData }) => ({
        url: `/products/meta/${id}`,
        method: "PUT",
        body: {
          ...brandData,
          type: "brand",
        } as ItemRequest,
      }),
      async onQueryStarted({ id, ...brandData }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getMetaData", undefined, (draft) => {
            if (draft?.data?.brands) {
              const brandIndex = draft.data.brands.findIndex(
                (brand) => brand.id === id
              );
              if (brandIndex !== -1) {
                draft.data.brands[brandIndex] = { id, ...brandData };
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Brands", "Meta"],
    }),

    deleteBrand: build.mutation<SimpleApiResponse, BrandOption>({
      query: ({ id, ...brandData }) => ({
        url: `/products/meta/${id}`,
        method: "DELETE",
        body: {
          ...brandData,
          type: "brand",
        } as ItemRequest,
      }),
      invalidatesTags: ["Brands", "Meta"],
    }),

    createSkinType: build.mutation<
      SimpleApiResponse,
      Omit<SkinTypeOption, "id">
    >({
      query: (skinTypeData) => ({
        url: "/products/meta",
        method: "POST",
        body: {
          ...skinTypeData,
          type: "skinType",
        } as ItemRequest,
      }),
      invalidatesTags: ["SkinTypes", "Meta"],
    }),

    updateSkinType: build.mutation<SimpleApiResponse, SkinTypeOption>({
      query: ({ id, ...skinTypeData }) => ({
        url: `/products/meta/${id}`,
        method: "PUT",
        body: {
          ...skinTypeData,
          type: "skinType",
        } as ItemRequest,
      }),
      async onQueryStarted(
        { id, ...skinTypeData },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getMetaData", undefined, (draft) => {
            if (draft?.data?.skinTypes) {
              const skinTypeIndex = draft.data.skinTypes.findIndex(
                (st) => st.id === id
              );
              if (skinTypeIndex !== -1) {
                draft.data.skinTypes[skinTypeIndex] = { id, ...skinTypeData };
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["SkinTypes", "Meta"],
    }),

    deleteSkinType: build.mutation<SimpleApiResponse, SkinTypeOption>({
      query: ({ id, ...skinTypeData }) => ({
        url: `/products/meta/${id}`,
        method: "DELETE",
        body: {
          ...skinTypeData,
          type: "skinType",
        } as ItemRequest,
      }),
      invalidatesTags: ["SkinTypes", "Meta"],
    }),
    //#endregion

    //#region Orders
    getAllOrders: build.query<OrdersResponse, void>({
      query: () => "/orders/all",
      providesTags: ["Orders"],
      keepUnusedDataFor: 300,
    }),

    getOrderDetail: build.query<OrderDetailResponse, string>({
      query: (orderId) => `/orders/details/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: "OrderDetail", id: orderId },
      ],
      keepUnusedDataFor: 300,
    }),

    updateOrderStatus: build.mutation<
      { success: boolean; message?: string },
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/update/${orderId}`,
        method: "PUT",
        body: { status },
      }),

      async onQueryStarted({ orderId, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getAllOrders", undefined, (draft) => {
            if (draft?.orders) {
              const orderIndex = draft.orders.findIndex(
                (order) => order.id === orderId
              );
              if (orderIndex !== -1) {
                draft.orders[orderIndex].status = status as
                  | "PROCESSING"
                  | "SHIPPED"
                  | "DELIVERED"
                  | "CANCELLED";
                draft.orders[orderIndex].updatedAt = new Date().toISOString();
              }
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { orderId }) => [
        "Orders",
        { type: "OrderDetail", id: orderId },
      ],
    }),

    // cancelOrder: build.mutation<
    //   { success: boolean; message?: string },
    //   { orderId: string; reason: string; images: string[] }
    // >({
    //   query: ({ orderId, reason, images }) => ({
    //     url: `/orders/cancel/${orderId}`,
    //     method: "POST",
    //     body: { reason, images },
    //   }),
    //   invalidatesTags: (result, error, { orderId }) => [
    //     "Orders",
    //     { type: "OrderDetail", id: orderId },
    //   ],
    // }),
    //#endregion

    //#region Events
    getAllEvents: build.query<Event[], void>({
      query: () => "/events/get",
      transformResponse: (response: EventsResponse) => response.events,
      providesTags: ["Event"],
    }),

    getEventById: build.query<Event, string>({
      query: (id) => `/events/get/${id}`,
      transformResponse: (response: EventResponse) => response.event,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    getNewEventById: build.query<IEvent, string>({
      query: (id) => `/events/get/${id}`,
      transformResponse: (response) => response.event,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    createEvent: build.mutation<ApiResponse, CreateEventRequest>({
      query: (eventData) => ({
        url: "/events/add",
        method: "POST",
        body: eventData,
      }),
      invalidatesTags: ["Event"],
    }),

    updateEvent: build.mutation<ApiResponse, UpdateEventRequest>({
      query: ({ id, ...eventData }) => ({
        url: `/events/update/${id}`,
        method: "PUT",
        body: eventData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Event", id },
        "Event",
      ],
    }),

    deleteEvent: build.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event", "Question", "Reward"],
    }),

    finalizeEvent: build.mutation<
      ApiResponse,
      { eventId: string; force_finalize: string }
    >({
      query: ({ eventId, force_finalize }) => ({
        url: `/events/${eventId}/finalize`,
        method: "POST",
        body: { force_finalize },
      }),
      invalidatesTags: ["Event"],
    }),

    //#endregion

    //#region Questions
    getQuestionsByEventId: build.query<Question[], string>({
      query: (eventId) => `/events/${eventId}/questions`,
      transformResponse: (response: QuestionsResponse) => response.questions,
      providesTags: (result, error, eventId) => [
        { type: "Question", id: eventId },
        "Question",
      ],
    }),

    createQuestion: build.mutation<ApiResponse, CreateQuestionRequest>({
      query: ({ event_id, content, image_url, questionOptions }) => ({
        url: `/events/${event_id}/questions/add`,
        method: "POST",
        body: {
          content,
          image_url,
          options: questionOptions,
        },
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Question", id: event_id },
        "Question",
      ],
    }),

    updateQuestion: build.mutation<ApiResponse, UpdateQuestionRequest>({
      query: ({ id, event_id, content, questionOptions }) => ({
        url: `/events/${event_id}/questions/update/${id}`,
        method: "PUT",
        body: {
          content,
          options: questionOptions,
        },
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Question", id: event_id },
        "Question",
      ],
    }),

    deleteQuestion: build.mutation<
      ApiResponse,
      { id: string; event_id: string }
    >({
      query: ({ id, event_id }) => ({
        url: `/events/${event_id}/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Question", id: event_id },
        "Question",
      ],
    }),
    //#endregion

    //#region Rewards
    getRewardsByEventId: build.query<EventReward[], string>({
      query: (eventId) => `/events/${eventId}/rewards`,
      transformResponse: (response: RewardsResponse) => response.eventRewards,
      providesTags: (result, error, eventId) => [
        { type: "Reward", id: eventId },
        "Reward",
      ],
    }),

    createReward: build.mutation<ApiResponse, CreateRewardRequest>({
      query: ({ event_id, ...rewardData }) => ({
        url: `/events/${event_id}/rewards/add`,
        method: "POST",
        body: rewardData,
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Reward", id: event_id },
        "Reward",
      ],
    }),

    updateReward: build.mutation<ApiResponse, UpdateRewardRequest>({
      query: ({ id, event_id, ...rewardData }) => ({
        url: `/events/${event_id}/rewards/update/${id}`,
        method: "PUT",
        body: rewardData,
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Reward", id: event_id },
        "Reward",
      ],
    }),

    deleteReward: build.mutation<ApiResponse, { id: string; event_id: string }>(
      {
        query: ({ id, event_id }) => ({
          url: `/events/${event_id}/rewards/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, { event_id }) => [
          { type: "Reward", id: event_id },
          "Reward",
        ],
      }
    ),
    //#endregion

    //#region Vouchers
    getAllVoucherss: build.query<Voucher[], void>({
      query: () => "/vouchers/all",
      transformResponse: (response: VouchersResponse) => response.vouchers,
      providesTags: ["Vouchers"],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    getVoucherByEventId: build.query<IResponse<IVoucher[], "vouchers">, string>(
      {
        query: (id) => `vouchers/event/${id}`,
        providesTags: ["Vouchers"],
      }
    ),

    //#endregion

    //#region Voucher Templates
    getVoucherTemplates: build.query<
      VoucherTemplate[],
      { eventId: string; params?: VoucherTemplateFilterParams }
    >({
      query: ({ eventId, params }) => {
        const searchParams = new URLSearchParams();
        if (params?.is_active !== undefined) {
          searchParams.append("is_active", params.is_active.toString());
        }
        if (params?.include_leaderboard !== undefined) {
          searchParams.append(
            "include_leaderboard",
            params.include_leaderboard.toString()
          );
        }
        const queryString = searchParams.toString();
        return `/events/${eventId}/voucher-templates${queryString ? `?${queryString}` : ""}`;
      },
      transformResponse: (response: VoucherTemplatesResponse) =>
        response.voucher_templates,
      providesTags: ["VoucherTemplates"],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    getVoucherTemplateById: build.query<
      VoucherTemplate,
      { eventId: string; voucherId: string }
    >({
      query: ({ eventId, voucherId }) =>
        `/events/${eventId}/voucher-templates/${voucherId}`,
      transformResponse: (response: VoucherTemplateResponse) =>
        response.voucher_template,
      providesTags: ["VoucherTemplates"],
    }),

    createVoucherTemplate: build.mutation<
      VoucherTemplate,
      { eventId: string; data: CreateVoucherTemplateRequest }
    >({
      query: ({ eventId, data }) => ({
        url: `/events/${eventId}/voucher-templates`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: VoucherTemplateResponse) =>
        response.voucher_template,
      invalidatesTags: ["VoucherTemplates"],
    }),

    updateVoucherTemplate: build.mutation<
      VoucherTemplate,
      { eventId: string; voucherId: string; data: UpdateVoucherTemplateRequest }
    >({
      query: ({ eventId, voucherId, data }) => ({
        url: `/events/${eventId}/voucher-templates/${voucherId}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: VoucherTemplateResponse) =>
        response.voucher_template,
      invalidatesTags: ["VoucherTemplates"],
    }),

    deleteVoucherTemplate: build.mutation<
      void,
      { eventId: string; voucherId: string }
    >({
      query: ({ eventId, voucherId }) => ({
        url: `/events/${eventId}/voucher-templates/${voucherId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VoucherTemplates"],
    }),

    //#endregion

    //#region UserVouchers
    getUserVouchers: build.query<IResponse<IVoucher[], "vouchers">, void>({
      query: () => ({
        url: "vouchers",
        method: "GET",
      }),
      providesTags: ["Vouchers"],
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

    //#region cancelOrder
    cancelOrder: build.mutation<
      IResponse<IOrder, "order">,
      { id: string; reason: string }
    >({
      query: ({ id, reason }) => ({
        url: `orders/cancel/${id}`,
        method: "POST",
        body: { reason, images: [] },
      }),
      invalidatesTags: ["Orders"],
    }),
    //#endregion
  }),
});

export const {
  useGetProductsQuery,
  useGetEventRewardsQuery,
  usePostAnswerMutation,
  useGetRandomQuestionQuery,
  useGetOrderByIdQuery,
  useLazyGetReviewsByIdQuery,
  usePostReviewMutation,

  // Products
  useGetProductMetaQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,

  // Meta Data
  useGetMetaDataQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useCreateSkinTypeMutation,
  useUpdateSkinTypeMutation,
  useDeleteSkinTypeMutation,

  // Orders
  useGetAllOrdersQuery,
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,

  // Events
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useFinalizeEventMutation,
  useGetNewEventByIdQuery,
  useCalculateRewardMutation,
  useGetEventLeaderboardQuery,

  // Questions
  useGetQuestionsByEventIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,

  // Rewards
  useGetRewardsByEventIdQuery,
  useCreateRewardMutation,
  useUpdateRewardMutation,
  useDeleteRewardMutation,

  // Leaderboard Rewards
  useGetLeaderboardRewardsQuery,
  useGetLeaderboardRewardByIdQuery,
  useCreateLeaderboardRewardMutation,
  useUpdateLeaderboardRewardMutation,
  useDeleteLeaderboardRewardMutation,
  useAddVoucherTemplateToRewardMutation,

  // Vouchers
  useGetAllVouchersQuery, //qdao
  useGetVoucherByEventIdQuery,
  useGetUserVouchersQuery,
  useGetAllVoucherssQuery, //khoa

  // Voucher Templates
  useGetVoucherTemplatesQuery,
  useGetVoucherTemplateByIdQuery,
  useCreateVoucherTemplateMutation,
  useUpdateVoucherTemplateMutation,
  useDeleteVoucherTemplateMutation,

  // Warehouse - Batches
  useGetAllBatchesQuery,
  useGetProductBatchesQuery,
  useCreateProductBatchMutation,

  // Suppliers
  useGetSuppliersQuery,
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
