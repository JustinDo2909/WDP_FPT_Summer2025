export { };

declare global {
    type ProductQueryParams = {
        category?: string;
        brand?: string;
        page?: number;
        skinType?: string;
        limit?: number;
        sort?: string;
        title?: string;
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

    type IListResponse<T, N extends string> = Record<N, T[]> & {
        success: boolean;
    }


}