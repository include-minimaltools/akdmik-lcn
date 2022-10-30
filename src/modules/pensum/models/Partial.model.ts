import { ApiResponse } from "models";

export type Partial = {
  idPartial: string;
  name: string;
  active: boolean;
};

export type PartialListResponse = ApiResponse<Partial[]>;

export type PartialResponse = ApiResponse<Partial>;
