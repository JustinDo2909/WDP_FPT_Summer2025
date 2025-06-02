export { };

declare global {
    type ProductQueryParams = {
        category?: string;
        brand?: string;
        page?: number;
        limit?: number;
        sort?: string;
        query?: string;
    };

    type PaginatedResponse<T, N extends string> = Record<N, T[]> & {
        pagination: PaginationMeta;
        success: boolean;
    };

    type PaginationMeta = {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };


}