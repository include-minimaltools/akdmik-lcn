import { createSlice } from "@reduxjs/toolkit";
import reducers from "./header.reducer";

export type OptionType = {
  label: string;
  options: string[];
}

export type NewButtonState = {
  visible: boolean;
};

export type SearchState = {
  visible: boolean;
  options: OptionType[];
  searchValue: string;
};

export type HeaderState = {
  new: NewButtonState;
  search: SearchState;
};

export const initialSearchState: SearchState = {
  visible: false,
  options: [],
  searchValue: "",
};

export const initialNewButtonState: NewButtonState = {
  visible: false,
};

const initialState: HeaderState = {
  new: initialNewButtonState,
  search: initialSearchState,
};

const name = "Header";

const slice = createSlice({
  name,
  initialState,
  reducers,
});

export const {
  setHeader,
  setNewButtonState,
  setSearchState,
  cleanSearchState,
  setOptions,
  setValue
} = slice.actions;

export default slice;
