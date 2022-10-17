export type ApiResponse<T = any> = {
  data: T;
  error: boolean;
  message: string;
};
