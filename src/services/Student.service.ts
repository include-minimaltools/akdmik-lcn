import type {
  ApiResponse,
  Student,
  StudentAcademicYearGradeListResponse,
  StudentListResponse,
  StudentResponse,
} from "models";
import { SchoolReport, SchoolReportDetail } from "modules/home/models";
import { api, getToken, loadAbort } from "utils";

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

export const createStudentWithParents = (student: Student) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Student/StudentWithParents", student, {
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

export const updateStudentWithParents = (student: Student) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Student/StudentWithParents", student, {
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

export type getStudentByAcademicYearPartialAndGradeProps = {
  idAcademicYearPartial: number;
  idGrade: number;
};

export const getStudentByAcademicYearPartialAndGrade = ({
  idAcademicYearPartial,
  idGrade,
}: getStudentByAcademicYearPartialAndGradeProps) => {
  const controller = loadAbort();
  const call = api.get<StudentAcademicYearGradeListResponse>(
    `Student/AcademicYearPartial/${idAcademicYearPartial}/Grade/${idGrade}`,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};

export type createSchoolReportWithDetailsProps = {
  schoolReport: Omit<SchoolReport, "idSchoolReport">;
  schoolReportDetails: Omit<
    SchoolReportDetail,
    "idSchoolReportDetail" | "idSchoolReport"
  >[];
};

export const createSchoolReportWithDetails = (
  body: createSchoolReportWithDetailsProps
) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Student/SchoolReport", body, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateSchoolReportWithDetails = (
  body: createSchoolReportWithDetailsProps
) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Student/SchoolReport", body, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getStudentCount = () => {
  const controller = loadAbort();
  const call = api.get<ApiResponse>("Student/Count", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export type saveGradeSchoolReportWithDetailsProps = {
  body: createSchoolReportWithDetailsProps[];
  idAcademicYear: number;
  idGrade: number;
};

export const saveGradeSchoolReportWithDetails = ({
  body,
  idAcademicYear,
  idGrade,
}: saveGradeSchoolReportWithDetailsProps) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>(
    `Student/AcademicYear/${idAcademicYear}/Grade/${idGrade}/SchoolReport`,
    body,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};

export type getSchoolReportProps = {
  year: number;
  idStudent: string;
};

export const getSchoolReport = ({
  year,
  idStudent,
}: getSchoolReportProps) => {
  const controller = loadAbort();
  const call = api.get<ApiResponse>(
    `Student/SchoolReport/${idStudent}_${year}.pdf`,
    {
      signal: controller.signal,
      headers,
    }
  );

  return { call, controller };
};
