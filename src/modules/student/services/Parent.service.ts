import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type { ParentListResponse, ParentResponse, Parent } from "../models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getParents = () => {
  const controller = loadAbort();
  const call = api.get<ParentListResponse>("Parent", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getParent = (idParent: number) => {
  const controller = loadAbort();
  const call = api.get<ParentResponse>(`Parent/${idParent}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createParent = (parent: Parent) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Parent", parent, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateParent = (parent: Parent) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Parent", parent, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deleteParent = (idParent: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Parent/${idParent}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const getParentCount = () => {
  const controller = loadAbort();
  const call = api.get<ApiResponse>("Parent/Count", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
}

