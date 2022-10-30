export type ErrorResponse = {
  detail: string;
  errors: object;
  message?: string;
  status: number;
  title: string;
  traceId: string;
  type: string;
};
