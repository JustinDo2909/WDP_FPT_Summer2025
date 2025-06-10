import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";

export const apiAddress = createApi({
    baseQuery: customBaseQuery, // Assumes cookies are handled here
    reducerPath: "apiAddress",
    tagTypes: ["Address"],
    endpoints: (build) => ({
        //#region getAddress
        getAddress: build.query<any, void>({
            query: () => ({
                url: "addresses/get",
                method: "GET",
                credentials: "include", // if you're using cookie-based auth
            }),
            providesTags: ["Address"],
        }),
        //#endregion 

        //#region addToAddress
        addToAddress: build.mutation<any, {
            address: string;
            city: string;
            pincode: string;
            phone: string;
            notes: string;
            to_city_id: string;
            to_district_id: string;
            to_ward_code: string;
        }>({
            query: (body) => ({
                url: "addresses/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Address"],
        }),

        //#endregion 

        //#region updateAddress
        updateAddress: build.mutation<any, {
            id: string;
            address: string;
            city: string;
            pincode: string;
            phone: string;
            notes: string;
            to_city_id: string;
            to_district_id: string;
            to_ward_code: string;
        }>({
            query: ({ id, ...rest }) => ({
                url: `addresses/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Address"],
        }),

        //#endregion 

        //#region deleteAddress
        deleteAddress: build.mutation<any, string>({
            query: (id) => ({
                url: `addresses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Address"],
        }),
        //#endregion 
    }),
});

export const {
    useGetAddressQuery,
    useAddToAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
} = apiAddress;