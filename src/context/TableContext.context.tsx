import { createContext, useContext } from "react";

const TableContext = createContext({ reload: () => {} });

export const TableProvider = TableContext.Provider

export const useTable = () => useContext(TableContext);
