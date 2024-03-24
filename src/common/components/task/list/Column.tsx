import { DragEvent } from "react";
import tw from "tailwind-styled-components";

import { TableColumnType } from "@/common/types/TableColumnType";
import { TaskItem } from "../item/TaskItem";
import { useAppDispatch } from "@/common/hooks/useRedux";
import { mainActions } from "@/common/store/slices/main";
import { DRAG_TRANSFER_KEY } from "@/common/data/constants";

type ColumnType = {
  column: TableColumnType;
  columns: TableColumnType[];
  tableIndex: number;
  columnIndex: number;
};

export function Column({
  column,
  columns,
  tableIndex,
  columnIndex,
}: Readonly<ColumnType>) {
  const { title, tasks } = column;

  const dispatch = useAppDispatch();

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    const { columnIndex: prevColumnIndex, taskIndex: dropTaskIndex } =
      JSON.parse(event.dataTransfer.getData(DRAG_TRANSFER_KEY));

    if (prevColumnIndex !== columnIndex) {
      dispatch(
        mainActions.changeTaskColumn({
          newColumnIndex: columnIndex,
          oldColumnIndex: prevColumnIndex,
          tableIndex,
          taskIndex: dropTaskIndex,
        }),
      );
    }
  };

  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Wrapper onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
      <Title>{`${title} (${tasks.length})`}</Title>
      {tasks.map((task, taskIndex) => (
        <TaskItem
          key={task.id}
          tableIndex={tableIndex}
          columnIndex={columnIndex}
          taskIndex={taskIndex}
          task={task}
          columns={columns}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = tw.div`
space-y-5
basis-280
shrink-0
`;

const Title = tw.h4`
text-[15px]
text-montage
font-bold
mb-4
`;
