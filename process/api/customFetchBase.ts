import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

const customBaseQuery = async (
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
      // else {
      //   toast.error("Session expired. Please log in again.");
      // }
    }

    // Only show error for actual error status codes (400+)
    if (result.error && result.error.status >= 400) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      // toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    // Show success message for successful mutations
    if (isMutationRequest && result.data && !result.error) {
      const successMessage =
        result.data?.message || "Operation completed successfully";
      toast.success(successMessage);
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    toast.error(`Error: ${errorMessage}`);
    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export default customBaseQuery;
