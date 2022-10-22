import { DependencyList, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux-store";
import {
  cleanSearchState,
  OptionType,
  SearchState,
  setSearchState,
  setValue,
} from "redux-store/header";

const useSearch = (options?: OptionType[], deps: DependencyList = []) => {
  const { search } = useAppSelector((state) => state.header);

  const dispatch = useAppDispatch();

  const setSearch = useCallback(
    (value: SearchState) => dispatch(setSearchState(value)),
    []
  );

  const setSearchValue = useCallback(
    (value: string) => dispatch(setValue(value)),
    []
  );

  const cleanSearch = useCallback(() => dispatch(cleanSearchState()), []);

  useEffect(() => {
    setSearch({
      visible: true,
      options: options || [],
      searchValue: "",
    });

    return () => {
      cleanSearch();
    };
  }, deps);

  return {
    ...search,
    setSearch,
    cleanSearch,
    setSearchValue,
  };
};

export default useSearch;
