import { DEFAULT_USER, User } from "models";
import { createSlice } from "@reduxjs/toolkit";
import reducers from "./auth.reducer";

export type AuthState = {
  user: User;
  token: string;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: DEFAULT_USER,
  token: "",
  isAuthenticated: false,
};

const name = "User";

const slice = createSlice({
  name,
  initialState,
  reducers,
});

export const { authenticate, setUser } = slice.actions;

export default slice;
