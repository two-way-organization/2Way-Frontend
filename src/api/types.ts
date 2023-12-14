export type RequestError = {
  status: number;
  error: unknown;
  body: unknown;
};

export type Pagination<T> = T & {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
};
