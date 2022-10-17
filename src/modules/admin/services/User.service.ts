import { api } from "utils";
import { loadAbort } from "utils/load-abort";
import { getToken } from "utils/token";
import { UserListResponse } from "../models/UserResponse";

export const getUsers = () => {
  const controller = loadAbort();
  const call = api.get<UserListResponse>("Auth/User", {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return {
    call,
    controller,
  };
};
