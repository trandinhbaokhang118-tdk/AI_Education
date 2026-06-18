export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
}

export interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
