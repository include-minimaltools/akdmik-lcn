import { ApiResponse } from "models";

export type StudentApprovedStatus = "P" | "I" | "F" | "C";

export type StudentApproved = {
  value: string;
  isApproved: boolean;
};

export type StudentApprovedListResponse = ApiResponse<StudentApproved[]>;

export type StudentApprovedResponse = ApiResponse<StudentApproved>;
