import { ApiResponse } from "models";

export type Relationship = {
  idRelationship: string;
  description: string;
  active: boolean;
};

export type RelationshipListResponse = ApiResponse<Relationship[]>;

export type RelationshipResponse = ApiResponse<Relationship>;
