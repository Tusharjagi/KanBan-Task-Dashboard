import { useMemo, useState, DragEvent } from "react";
import tw from "tailwind-styled-components";

import { TaskType } from "@/common/types/TaskType";
import { DetailTaskModal } from "../detail";
import { TableColumnType } from "@/common/types/TableColumnType";
import { DRAG_TRANSFER_KEY } from "@/common/data/constants";

type TaskItemType = {
  tableIndex: number;
  columnIndex: number;
  taskIndex: number;
  task: TaskType;
  columns: TableColumnType[];
};

export function TaskItem({
  tableIndex,
  columnIndex,
  taskIndex,
  task,
  columns,
}: Readonly<TaskItemType>) {
  const [open, setOpen] = useState(false);

  const subtasksLength = task.subtasks.length;
  const subtaskCompletedLength = useMemo(
    () => task.subtasks.filter((x) => x.doing).length,
    [task.subtasks],
  );

  const subtitle = `${subtaskCompletedLength} of ${subtasksLength} subtasks`;

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnOpen = () => {
    setOpen(true);
  };

  const handleOnDragStart = (event: DragEvent<HTMLDivElement>) => {
    const text = JSON.stringify({
      taskIndex,
      columnIndex,
    });
    event.dataTransfer.setData(DRAG_TRANSFER_KEY, text);
  };

  return (
    <>
      <Wrapper
        onClick={handleOnOpen}
        onDragStart={handleOnDragStart}
        draggable={true}
      >
        <Title>{task.title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Wrapper>
      <DetailTaskModal
        open={open}
        onClose={handleOnClose}
        tableIndex={tableIndex}
        columnIndex={columnIndex}
        taskIndex={taskIndex}
        task={task}
        columns={columns}
      />
    </>
  );
}

const Wrapper = tw.div`
bg-white
dark:bg-gunmetal
p-5
rounded-md
cursor-pointer
drop-shadow-md
`;

const Title = tw.h3`
text-base
text-gray-800
dark:text-white
font-bold
mb-2
`;

const Subtitle = tw.span`
text-montage
text-sm
`;
