import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type { AreaListResponse, AreaResponse, Area } from "../models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getAreas = () => {
  const controller = loadAbort();
  const call = api.get<AreaListResponse>("Area", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getArea = (idArea: number) => {
  const controller = loadAbort();
  const call = api.get<AreaResponse>(`Area/${idArea}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createArea = (Area: Area) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Area", Area, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateArea = (Area: Area) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Area", Area, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deleteArea = (idArea: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Area/${idArea}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};
