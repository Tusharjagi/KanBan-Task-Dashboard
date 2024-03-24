import { RefObject } from "react";
import tw from "tailwind-styled-components";

import { TableColumnType } from "@/common/types/TableColumnType";
import { Column } from "./Column";

type TaskListType = {
  listRef: RefObject<HTMLDivElement>;
  columns: TableColumnType[];
  tableIndex: number;
};

export function TaskList({
  listRef,
  columns,
  tableIndex,
}: Readonly<TaskListType>) {
  return (
    <Wrapper ref={listRef}>
      {columns.map((column, columnIndex) => (
        <Column
          key={column.id}
          column={column}
          columns={columns}
          tableIndex={tableIndex}
          columnIndex={columnIndex}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex
flex-nowrap
space-x-5
transition-transform
`;
