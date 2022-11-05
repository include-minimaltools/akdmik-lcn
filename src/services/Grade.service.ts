import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type { GradeListResponse, GradeResponse, Grade } from "models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getGrades = () => {
  const controller = loadAbort();
  const call = api.get<GradeListResponse>("Grade", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getGrade = (idGrade: number) => {
  const controller = loadAbort();
  const call = api.get<GradeResponse>(`Grade/${idGrade}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createGrade = (Grade: Grade) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Grade", Grade, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createGradeWithCourses = (grade: Required<Grade>) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Grade/GradeWithCourses", grade, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateGrade = (grade: Grade) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Grade", grade, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const updateGradeWithCourses = (grade: Required<Grade>) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Grade/GradeWithCourses", grade, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deleteGrade = (idGrade: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Grade/${idGrade}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};
