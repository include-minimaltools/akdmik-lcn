import type { ApiResponse, Role } from "models";
import { api, getToken, loadAbort } from "utils";
import type { RoleListResponse, RoleResponse } from "../models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getRoles = () => {
  const controller = loadAbort();
  const call = api.get<RoleListResponse>("Role", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getRole = (idRole: number) => {
  const controller = loadAbort();
  const call = api.get<RoleResponse>(`Role/${idRole}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createRole = (role: Role) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Role", role, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateRole = (role: Role) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Role", role, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deleteRole = (idRole: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Role/${idRole}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};
