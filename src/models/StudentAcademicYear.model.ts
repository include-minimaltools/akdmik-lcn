import { ApiResponse } from "models";

export type StudentAcademicYearGrade = {
  idStudentAcademicYear: string;
  idStudent: string;
  name: string;
  lastName: string;
};

export type StudentAcademicYearGradeListResponse = ApiResponse<
  StudentAcademicYearGrade[]
>;

export type StudentAcademicYearGradeResponse =
  ApiResponse<StudentAcademicYearGrade>;
