import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import type {
  MetaDataResponse,
  CategoryOption,
  BrandOption,
  SkinTypeOption,
} from "@/types/category-brand/index";

const BASE_URL = "https://cosme-play-be.vercel.app/api";

// Types for API requests
type ItemRequest = {
  title: string;
  description: string;
  type: "category" | "brand" | "skinType";
};

// Simple API response type matching backend
type SimpleApiResponse = {
  success: boolean;
  message: string;
};

export const metaApi = createApi({
  reducerPath: "metaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
  tagTypes: ["Categories", "Brands", "SkinTypes", "Meta"],
  endpoints: (builder) => ({
    // Get all meta data (categories, brands, skin types)
    getMetaData: builder.query<MetaDataResponse, void>({
      query: () => "/products/meta",
      providesTags: ["Meta", "Categories", "Brands", "SkinTypes"],
      keepUnusedDataFor: 600, // 10 minutes cache
    }),

    // Categories
    createCategory: builder.mutation<
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

    updateCategory: builder.mutation<SimpleApiResponse, CategoryOption>({
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
        // Optimistic update
        const patchResult = dispatch(
          metaApi.util.updateQueryData("getMetaData", undefined, (draft) => {
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

    deleteCategory: builder.mutation<SimpleApiResponse, CategoryOption>({
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

    // Brands
    createBrand: builder.mutation<SimpleApiResponse, Omit<BrandOption, "id">>({
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

    updateBrand: builder.mutation<SimpleApiResponse, BrandOption>({
      query: ({ id, ...brandData }) => ({
        url: `/products/meta/${id}`,
        method: "PUT",
        body: {
          ...brandData,
          type: "brand",
        } as ItemRequest,
      }),
      async onQueryStarted({ id, ...brandData }, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          metaApi.util.updateQueryData("getMetaData", undefined, (draft) => {
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

    deleteBrand: builder.mutation<SimpleApiResponse, BrandOption>({
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

    // Skin Types
    createSkinType: builder.mutation<
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

    updateSkinType: builder.mutation<SimpleApiResponse, SkinTypeOption>({
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
        // Optimistic update
        const patchResult = dispatch(
          metaApi.util.updateQueryData("getMetaData", undefined, (draft) => {
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

    deleteSkinType: builder.mutation<SimpleApiResponse, SkinTypeOption>({
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
  }),
});

export const {
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
} = metaApi;
