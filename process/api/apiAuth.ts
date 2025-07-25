import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";
import type { UserResponse } from "@/types/user";

export const apiAuth = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "apiAuth",
  tagTypes: [],
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
  useRegisterMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useLazyGetUserQuery,
  useLazyLogOutQuery,
} = apiAuth;
