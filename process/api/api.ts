import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";
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
  ],
  endpoints: (build) => ({
    //#region Products
    getProducts: build.query<ProductsResponse, ProductQueryParams>({
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
      query: ({ event_id, ...questionData }) => ({
        url: `/events/${event_id}/questions/add`,
        method: "POST",
        body: questionData,
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Question", id: event_id },
        "Question",
      ],
    }),

    updateQuestion: build.mutation<ApiResponse, UpdateQuestionRequest>({
      query: ({ id, event_id, ...questionData }) => ({
        url: `/events/${event_id}/questions/update/${id}`,
        method: "PUT",
        body: questionData,
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
    getAllVouchers: build.query<Voucher[], void>({
      query: () => "/vouchers/all",
      transformResponse: (response: VouchersResponse) => response.vouchers,
      providesTags: ["Vouchers"],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),
    //#endregion
  }),
});

export const {
  // Products
  useGetProductsQuery,
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

  // Events
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,

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

  // Vouchers
  useGetAllVouchersQuery,
} = api;
