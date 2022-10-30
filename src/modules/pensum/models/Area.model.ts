import { ApiResponse } from "models";

export type Area = {
  idArea: string;
  description: string;
  active: boolean;
};

export type AreaListResponse = ApiResponse<Area[]>;

export type AreaResponse = ApiResponse<Area>;
