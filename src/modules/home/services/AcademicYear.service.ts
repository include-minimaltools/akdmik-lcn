import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type { AcademicYearListResponse, AcademicYearResponse, AcademicYear } from "../models";

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

export const disableAcademicYearPartial = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`AcademicYear/AcademicYearPartial/${idAcademicYear}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const reactivateAcademicYearPartial = (idAcademicYear: number) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>(`AcademicYear/AcademicYearPartial/${idAcademicYear}`, null,{
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

