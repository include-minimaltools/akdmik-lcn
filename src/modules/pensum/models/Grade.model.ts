import { ApiResponse } from "models";

export type Grade = {
  idGrade: string;
  description: string;
  active: boolean;
};

export type GradeListResponse = ApiResponse<Grade[]>;

export type GradeResponse = ApiResponse<Grade>;
