import { Dispatch, SetStateAction, memo } from "react";

import { FieldArray } from "@/common/components/field-array";
import { TableColumnType } from "@/common/types/TableColumnType";
import { v4 as uuid } from "uuid";

type TableColumnsProps = {
  columns: TableColumnType[];
  setColumns: Dispatch<SetStateAction<TableColumnType[]>>;
};

export const TableColumns = memo(
  ({ columns, setColumns }: TableColumnsProps) => {
    const handleAddColumn = (title: string) => {
      const newColumn = {
        id: uuid(),
        title,
        tasks: [],
      };

      setColumns([...columns, newColumn]);
    };

    const handleRemoveColumn = (index: number) => {
      const newColumns = columns.filter((_, i) => i !== index);
      console.log(newColumns);
      setColumns([...newColumns]);
    };

    return (
      <FieldArray
        values={columns}
        setValues={setColumns}
        titleSelector="title"
        addValue={handleAddColumn}
        removeValue={handleRemoveColumn}
      />
    );
  },
);

TableColumns.displayName = "TableColumns";
