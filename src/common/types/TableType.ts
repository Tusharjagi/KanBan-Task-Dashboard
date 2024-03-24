import { TableColumnType } from "./TableColumnType";

export type TableType = {
  id: string;
  title: string;
  columns: TableColumnType[];
};
