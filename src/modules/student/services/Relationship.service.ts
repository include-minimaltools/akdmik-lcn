import type { ApiResponse } from "models";
import { api, getToken, loadAbort } from "utils";
import type {
  RelationshipListResponse,
  RelationshipResponse,
  Relationship,
} from "../models";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const getRelationships = () => {
  const controller = loadAbort();
  const call = api.get<RelationshipListResponse>("Relationship", {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const getRelationship = (idRelationship: number) => {
  const controller = loadAbort();
  const call = api.get<RelationshipResponse>(`Relationship/${idRelationship}`, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const createRelationship = (relationship: Relationship) => {
  const controller = loadAbort();
  const call = api.post<ApiResponse>("Relationship", relationship, {
    signal: controller.signal,
    headers,
  });

  return { call, controller };
};

export const updateRelationship = (relationship: Relationship) => {
  const controller = loadAbort();
  const call = api.put<ApiResponse>("Relationship", relationship, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};

export const deleteRelationship = (idRelationship: number) => {
  const controller = loadAbort();
  const call = api.delete<ApiResponse>(`Relationship/${idRelationship}`, {
    signal: controller.signal,
    headers,
  });

  return { controller, call };
};
