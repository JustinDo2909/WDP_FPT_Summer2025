import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: async (headers) => {},
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    // if (result.data) {
    //   result.data = result.data.data;
    // } else if (
    //   result.error?.status === 204 ||
    //   result.meta?.response?.status === 24
    // ) {
    //   return { data: null };
    // }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

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
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: build.mutation<
      any,
      { email: string; otp: string; name: string; password: string }
    >({
      query: (body) => ({
        url: "/api/auth/verify-user",
        method: "POST",
        body,
      }),
    }),
    login: build.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    forgotPassword: build.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    verifyForgotPasswordOtp: build.mutation<
      any,
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/api/auth/verify-forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation<any, { email: string; newPassword: string }>({
      query: (body) => ({
        url: "/api/auth/reset-password",
        method: "POST",
        body,
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
} = apiAuth;
