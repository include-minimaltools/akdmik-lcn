import { ApiResponse } from "models";

export type StudentGrade = {
  idStudent: string;
  name: string;
  lastName: string;
  hasGrade: boolean;
};

export type StudentGradeListResponse = ApiResponse<StudentGrade[]>;

export type StudentGradeResponse = ApiResponse<StudentGrade>;
