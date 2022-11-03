import { createContext, FC, PropsWithChildren, useContext } from "react";

interface TableProviderProps extends PropsWithChildren {
  reload: () => void;
}

const TableContext = createContext({ reload: () => {} });

export const TableProvider: FC<TableProviderProps> = ({ reload, children }) => (
  <TableContext.Provider value={{ reload }}>{children}</TableContext.Provider>
);

export const useTable = () => useContext(TableContext);
