import { ApiResponse } from "models";

export type Student = {
  idStudent: string;
  name: string;
  lastName: string;
  identityDocument?: string;
  birthDate: string;
  gender: "M" | "F";
  phoneNumber?: string;
  address?: string;
  status: "A" | "I" | "G";
};

export type StudentListResponse = ApiResponse<Student[]>;

export type StudentResponse = ApiResponse<Student>;
