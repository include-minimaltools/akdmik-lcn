import { ApiResponse } from "models";

export type Grade = {
  idGrade: string;
  description: string;
  active: boolean;
  idCourses?: number[];
};

export type GradeListResponse = ApiResponse<Grade[]>;

export type GradeResponse = ApiResponse<Grade>;
