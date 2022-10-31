import { ApiResponse } from "models";

export type Parent = {
  idParent: string;
  name: string;
  identityDocument?: string;
  email?: string;
  phoneNumber?: string;
  active: boolean;
  idRelationship: number;
};

export type ParentListResponse = ApiResponse<Parent[]>;

export type ParentResponse = ApiResponse<Parent>;
