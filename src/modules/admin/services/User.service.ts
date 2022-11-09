import type { ApiResponse, User } from "models";
import { api, getToken, loadAbort } from "utils";
import type { UserListResponse, UserResponse } from "../models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getUsers = () => {
  const controller = loadAbort();
  const call = api.get<UserListResponse>("Auth/User", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getUser = (username: string) => {
  const controller = loadAbort();
  const call = api.get<UserResponse>(`Auth/User/${username}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createUser = (user: User) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Auth/User", user, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateUser = (user: User) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Auth/User", user, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deleteUser = (username: string) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Auth/User/${username}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const getUserCount = () => {
  const controller = loadAbort();
  const call = api.get<ApiResponse>("Auth/User/Count", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
}
