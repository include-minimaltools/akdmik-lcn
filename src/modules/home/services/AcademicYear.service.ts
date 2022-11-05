import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type {
  AcademicYearListResponse,
  AcademicYearResponse,
  AcademicYear,
} from "../models";
import { StudentGradeListResponse } from "../models/StudentGrade.model";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getAcademicYears = () => {
  const controller = loadAbort();
  const call = api.get<AcademicYearListResponse>("AcademicYear", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getAcademicYear = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.get<AcademicYearResponse>(`AcademicYear/${idAcademicYear}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createAcademicYear = (academicYear: AcademicYear) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("AcademicYear", academicYear, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const disableAcademicYear = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`AcademicYear/${idAcademicYear}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const finishAcademicYear = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>(
    `AcademicYear/Finish/${idAcademicYear}`,
    null,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};

export const finishAcademicYearWithPartials = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>(
    `AcademicYear/FinishWithPartials/${idAcademicYear}`,
    null,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};

export const disableAcademicYearPartial = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(
    `AcademicYear/Partial/${idAcademicYear}`,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};

export const reactivateAcademicYearPartial = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>(
    `AcademicYear/Partial/Reactivate/${idAcademicYear}`,
    null,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};

export const finishAcademicYearPartial = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>(
    `AcademicYear/Partial/Finish/${idAcademicYear}`,
    null,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};

export type getStudentsByAcademicYearAndGradeProps = {
  idAcademicYear: number;
  idGrade?: number;
};

export const getStudentsByAcademicYearAndGrade = ({
  idAcademicYear,
  idGrade,
}: getStudentsByAcademicYearAndGradeProps) => {
  const controller = loadAbort();
  const call = api.get<StudentGradeListResponse>(
    "Student/ByAcademicYearAndGrade",
    {
      signal: controller.signal,
      headers,
      params: {
        idAcademicYear: idAcademicYear,
        idGrade: idGrade,
      },
    }
  );

  return { call, controller };
};

export type registerStudentsInAcademicYearGradeProps = {
  idAcademicYear: number;
  idGrade: number;
  idStudents: string[];
};

export const registerStudentsInAcademicYearGrade = ({
  idAcademicYear,
  idGrade,
  idStudents,
}: registerStudentsInAcademicYearGradeProps) => {
  const controller = loadAbort();
  const call = api.post<StudentGradeListResponse>(
    `AcademicYear/${idAcademicYear}/Grade/${idGrade}/Students`,
    idStudents,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};

export const unregisterStudentsInAcademicYearGrade = ({
  idAcademicYear,
  idGrade,
  idStudents,
}: registerStudentsInAcademicYearGradeProps) => {
  const controller = loadAbort();
  const call = api.put<StudentGradeListResponse>(
    `AcademicYear/${idAcademicYear}/Grade/${idGrade}/Students`,
    idStudents,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};
