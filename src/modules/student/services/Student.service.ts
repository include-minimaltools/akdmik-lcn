import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type { StudentListResponse, StudentResponse, Student } from "../models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getStudents = () => {
  const controller = loadAbort();
  const call = api.get<StudentListResponse>("Student", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getStudent = (idStudent: number) => {
  const controller = loadAbort();
  const call = api.get<StudentResponse>(`Student/${idStudent}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createStudent = (student: Student) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Student", student, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateStudent = (student: Student) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Student", student, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deleteStudent = (idStudent: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Student/${idStudent}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};
