import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";
import type {
  User,
  UsersResponse,
  UserResponse,
  ApiResponse,
  CreateUserRequest,
  UpdateUserRequest,
  GetUsersParams,
} from "@/types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], GetUsersParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.pageSize)
          searchParams.append("pageSize", params.pageSize.toString());
        if (params?.role) searchParams.append("role", params.role);

        return `/users?${searchParams.toString()}`;
      },
      transformResponse: (response: UsersResponse) => {
        return response.users.filter((user) => user.role === "USER");
      },
      providesTags: ["User"],
    }),

    // Get user by ID
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: UserResponse) => response.user,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Create new user
    createUser: builder.mutation<ApiResponse, CreateUserRequest>({
      query: (userData) => ({
        url: "/users/add",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Update user
    updateUser: builder.mutation<ApiResponse, UpdateUserRequest>({
      query: ({ id, ...userData }) => ({
        url: `/users/update/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
