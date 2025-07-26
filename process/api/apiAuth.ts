import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserResponse } from "@/types/user";

export const apiAuth = createApi({
  baseQuery: async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://cosme-play-be.vercel.app/api",
    prepareHeaders: async (headers) => {
      // Get token from localStorage
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
    credentials: "include",
  });

  try {
    let result: any = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshResult: any = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        result = await baseQuery(args, api, extraOptions);
      } 
  
    }


    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    // toast.error(`Error: ${errorMessage}`);
    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
},
  reducerPath: "apiAuth",
  tagTypes: ["Carts"],
  endpoints: (build) => ({
    register: build.mutation<
      any,
      { name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: build.mutation<
      any,
      { email: string; otp: string; name: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/verify-user",
        method: "POST",
        body,
      }),
    }),
    login: build.mutation<UserResponse, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    forgotPassword: build.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    verifyForgotPasswordOtp: build.mutation<
      any,
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/auth/verify-forgot-password",
        method: "POST",
        body,
      }),
    }),
    getCart: build.query<any, void>({
      query: () => ({
        url: "cart/get-cart",
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),
    resetPassword: build.mutation<any, { email: string; newPassword: string }>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    getUser: build.query<any, void>({
      query: () => ({
        url: "/auth/logged-in-user",
        method: "GET",
        credentials: "include",
      }),
    }),
    logOut: build.query<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useRegisterMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useLazyGetUserQuery,
  useLazyLogOutQuery,
} = apiAuth;
