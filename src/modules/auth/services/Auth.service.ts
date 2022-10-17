import { api } from "utils";
import { loadAbort } from "utils/load-abort";
import { AuthenticateResponse } from "../models/AuthenticateResponse.model";

export const Authenticate = (username: string, password: string) => {
  const controller = loadAbort();
  const call = api.post<AuthenticateResponse>("Auth/Authenticate", null, {
    params: { username, password },
    signal: controller.signal,
  });

  return {
    call,
    controller,
  };
};
