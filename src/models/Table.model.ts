import type { ColumnsType as AntdColumnsType } from "antd/es/table";

export type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

export type ColumnsType<T = any> = AntdColumnsType<T>;
