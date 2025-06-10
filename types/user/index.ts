// User Entity Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "STAFF";
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface UsersResponse {
  success: boolean;
  users: User[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface UserResponse {
  success: boolean;
  user: User;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
}

// Request Types
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN" | "STAFF";
}

export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: "USER" | "ADMIN" | "STAFF";
}

export interface GetUsersParams {
  page?: number;
  pageSize?: number;
  role?: "USER" | "ADMIN" | "STAFF";
}

// Form Data Types
export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "STAFF";
}

// Search/Filter Types
export interface UserSearchParams {
  name?: string;
  email?: string;
  role?: "USER" | "ADMIN" | "STAFF";
}
