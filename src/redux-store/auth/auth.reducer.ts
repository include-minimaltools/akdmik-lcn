import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models";
import { setToken } from "utils/token";
import { AuthState } from "./auth.slice";

export const setUser: CaseReducer<AuthState, PayloadAction<User>> = (
  state,
  action
) => ({ ...state, user: action.payload });

export const authenticate: CaseReducer<AuthState, PayloadAction<AuthState>> = (
  _state,
  action
) => {
  setToken(action.payload.token);
  return action.payload;
};

export default {
  setUser,
  authenticate,
};
