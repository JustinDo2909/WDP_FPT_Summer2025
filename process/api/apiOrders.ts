import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";

export const apiOrders = createApi({
    baseQuery: customBaseQuery, // Assumes cookies are handled here
    reducerPath: "apiOrders",
    tagTypes: ["Orders"],
    endpoints: (build) => ({
        //#region createCheckoutSession
        createCheckoutSession: build.mutation<
            { success: boolean; url: string }, // Response type
            { shippingCost: number; addressId: string } // Input type
        >({
            query: (body) => ({
                url: "orders/create-checkout-session",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Orders"],
        }),

        //#endregion 

        //#region getOrders
        getOrders: build.query<any, void>({
            query: () => ({
                url: "orders",
                method: "GET",
                credentials: "include", // if you're using cookie-based auth
            }),
            providesTags: ["Orders"],
        }),
        //#endregion 

        //#region getOrderDetails
        getOrderDetails: build.query<any, {
            id: string;
        }>({
            query: ({ id }) => ({
                url: `orders/details/${id}`,
                method: "GET",
                credentials: "include", // if you're using cookie-based auth
            }),
            providesTags: ["Orders"],
        }),
        //#endregion 

        //#region updateOrders
        updateOrders: build.mutation<any, {
            id: string;
            status: string;
        }>({
            query: ({ id, ...rest }) => ({
                url: `orders/update/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Orders"],
        }),
        //#endregion 

    }),
});

export const {
    useGetOrdersQuery,
    useUpdateOrdersMutation,
    useCreateCheckoutSessionMutation,
    useGetOrderDetailsQuery,
} = apiOrders;
