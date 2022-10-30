import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type { PartialListResponse, PartialResponse, Partial } from "../models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getPartials = () => {
  const controller = loadAbort();
  const call = api.get<PartialListResponse>("Partial", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getPartial = (idPartial: number) => {
  const controller = loadAbort();
  const call = api.get<PartialResponse>(`Partial/${idPartial}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createPartial = (partial: Partial) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Partial", partial, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updatePartial = (partial: Partial) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Partial", partial, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deletePartial = (idPartial: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Partial/${idPartial}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};
