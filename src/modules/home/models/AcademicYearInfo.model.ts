import { ApiResponse } from "models";

export type AcademicYearInfo = {
  partialName: string;
  year: string;
};

export type AcademicYearInfoListResponse = ApiResponse<AcademicYearInfo[]>;

export type AcademicYearInfoResponse = ApiResponse<AcademicYearInfo>;
