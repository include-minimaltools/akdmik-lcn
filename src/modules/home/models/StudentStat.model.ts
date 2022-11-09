import { ApiResponse } from "models";

export type StudentStatStatus = "P" | "I" | "F" | "C";

export type StudentStat = {
  name: string;
  average: number;
};

export type StudentStatListResponse = ApiResponse<StudentStat[]>;

export type StudentStatResponse = ApiResponse<StudentStat>;
