import { Dispatch, SetStateAction, memo } from "react";

import { TableColumnType } from "@/common/types/TableColumnType";
import { Select, SelectOption } from "@/common/ui/select";

type TaskColumnSelectType = {
  columns: TableColumnType[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

export const TaskColumnSelect = memo(
  ({ columns, selectedIndex, setSelectedIndex }: TaskColumnSelectType) => {
    const handleOnChange = (value: number) => {
      setSelectedIndex(value);
    };

    return (
      <Select value={selectedIndex} onChange={handleOnChange}>
        {columns.map((e, i) => (
          <SelectOption key={e.id} value={i}>
            {e.title}
          </SelectOption>
        ))}
      </Select>
    );
  },
);

TaskColumnSelect.displayName = "TaskColumnSelect";
