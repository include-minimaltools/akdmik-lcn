import { ApiResponse } from "models";

export type SchoolReport = {
  idSchoolReport: number;
  idStudentAcademicYear: number;
  idAcademicYearPartial: number;
  absences: number;
  conduct: number;
  tardiness: number;
}

export type SchoolReportListResponse = ApiResponse<SchoolReport[]>;

export type SchoolReportResponse = ApiResponse<SchoolReport>;
