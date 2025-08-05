import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";

export const apiCart = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "apiCart",
  tagTypes: ["Carts"],
  endpoints: (build) => ({
    //#region getCart

    //#endregion

    //#region addToCart
    addToCart: build.mutation<any, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "cart/add-to-cart",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Carts"],
    }),
    //#endregion

    //#region updateCart
    updateCart: build.mutation<any, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "cart/update-cart",
        method: "PUT",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Carts"],
    }),
    //#endregion

    //#region removeFromCart
    removeFromCart: build.mutation<any, string>({
      query: (id) => ({
        url: `cart/remove-from-cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),
    //#endregion

    //#region removeFromCart
    getCart: build.query<any, void>({
      query: () => ({
        url: "cart/get-cart",
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),
    //#endRegion
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = apiCart;
