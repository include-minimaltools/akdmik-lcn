import { ApiResponse } from "models";

export type Course = {
  idCourse: string;
  area: string;
  idArea: number;
  name: string;
  active: boolean;
};

export type CourseListResponse = ApiResponse<Course[]>;

export type CourseResponse = ApiResponse<Course>;
