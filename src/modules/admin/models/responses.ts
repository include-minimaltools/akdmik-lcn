import { ApiResponse, Role, User } from "models";

export type UserListResponse = ApiResponse<User[]>;

export type UserResponse = ApiResponse<User>;

export type RoleListResponse = ApiResponse<Role[]>;

export type RoleResponse = ApiResponse<Role>;
