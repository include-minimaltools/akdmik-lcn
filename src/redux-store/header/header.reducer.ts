import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  HeaderState,
  initialSearchState,
  NewButtonState,
  SearchState,
} from "./header.slice";

export const setNewButtonState: CaseReducer<
  HeaderState,
  PayloadAction<NewButtonState>
> = (state, action) => ({ ...state, new: action.payload });

export const setSearchState: CaseReducer<
  HeaderState,
  PayloadAction<SearchState>
> = (state, action) => ({ ...state, search: action.payload });

export const setHeader: CaseReducer<HeaderState, PayloadAction<HeaderState>> = (
  _state,
  action
) => action.payload;

export const cleanSearchState: CaseReducer<HeaderState, PayloadAction> = (
  state,
  _action
) => ({ ...state, search: initialSearchState });

export const setOptions: CaseReducer<HeaderState, PayloadAction<string[]>> = (
  state,
  action
) => ({ ...state, search: { ...state.search, options: action.payload } });

export const setValue: CaseReducer<HeaderState, PayloadAction<string>> = (
  state,
  action
) => ({ ...state, search: { ...state.search, searchValue: action.payload } });

export default {
  setNewButtonState,
  setHeader,
  setSearchState,
  cleanSearchState,
  setOptions,
  setValue,
};
