import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import type { OrdersResponse, OrderDetailResponse } from "@/types/order/index";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cosme-play-be.vercel.app/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      // Add authentication token if available
      const token = Cookies.get("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Orders", "OrderDetail"],
  endpoints: (builder) => ({
    // Get all orders
    getAllOrders: builder.query<OrdersResponse, void>({
      query: () => "/orders/all",
      providesTags: ["Orders"],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    // Get order details by ID
    getOrderDetail: builder.query<OrderDetailResponse, string>({
      query: (orderId) => `/orders/details/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: "OrderDetail", id: orderId },
      ],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    // Update order status
    updateOrderStatus: builder.mutation<
      { success: boolean; message?: string },
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/update/${orderId}`,
        method: "PUT",
        body: { status },
      }),
      // Optimistic update for order status
      async onQueryStarted({ orderId, status }, { dispatch, queryFulfilled }) {
        // Update the orders list cache
        const patchResult = dispatch(
          orderApi.util.updateQueryData("getAllOrders", undefined, (draft) => {
            if (draft?.orders) {
              const orderIndex = draft.orders.findIndex(
                (order) => order.id === orderId
              );
              if (orderIndex !== -1) {
                draft.orders[orderIndex].status = status as any;
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
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
