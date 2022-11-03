import { ApiResponse } from "models";
import { AcademicYearPartial } from "./AcademicYearPartial.model";

export type AcademicYearStatus = "P" | "I" | "F" | "C";

export type AcademicYear = {
  idAcademicYear: number;
  year: string;
  status: AcademicYearStatus;
  idPartials?: number;
  academicYearPartials: AcademicYearPartial[];
};

export type AcademicYearListResponse = ApiResponse<AcademicYear[]>;

export type AcademicYearResponse = ApiResponse<AcademicYear>;
