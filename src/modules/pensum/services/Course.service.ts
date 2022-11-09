import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type { CourseListResponse, CourseResponse, Course } from "../models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getCourses = () => {
  const controller = loadAbort();
  const call = api.get<CourseListResponse>("Course", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getCourse = (idCourse: number) => {
  const controller = loadAbort();
  const call = api.get<CourseResponse>(`Course/${idCourse}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createCourse = (Course: Course) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Course", Course, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateCourse = (Course: Course) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Course", Course, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deleteCourse = (idCourse: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Course/${idCourse}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const getCourseCount = () => {
  const controller = loadAbort();
  const call = api.get<ApiResponse>("Course/Count", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
}
