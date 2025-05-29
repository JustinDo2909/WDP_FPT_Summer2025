import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: async (headers) => {},
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
      } else {
        toast.error("Session expired. Please log in again.");
      }
    }

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

export default customBaseQuery;
