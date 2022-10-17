import type { ApiResponse, User } from "models";

export type AuthenticateData = {
  user: User,
  token: string
}

export type AuthenticateResponse = ApiResponse<AuthenticateData>;
