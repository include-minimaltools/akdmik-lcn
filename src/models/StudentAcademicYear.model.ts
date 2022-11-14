import { ApiResponse } from "models";
import { SchoolReport, SchoolReportDetail } from "modules/home/models";

export type StudentAcademicYearGrade = {
  idStudentAcademicYear: number;
  idStudent: string;
  name: string;
  lastName: string;
  status: string;
  schoolReportDetails?: SchoolReportDetail[];
  schoolReport?: SchoolReport;
};

export type StudentAcademicYearGradeListResponse = ApiResponse<
  StudentAcademicYearGrade[]
>;

export type StudentAcademicYearGradeResponse =
  ApiResponse<StudentAcademicYearGrade>;
