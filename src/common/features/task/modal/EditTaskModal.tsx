import { FormEvent, useState } from "react";
import tw from "tailwind-styled-components";

import { Modal, ModalTitle } from "@/common/ui/modal";
import { Button } from "@/common/ui/button";
import { useAppDispatch } from "@/common/hooks/useRedux";
import { SubtaskType } from "@/common/types/SubtaskType";
import { mainActions } from "@/common/store/slices/main";
import { TaskTitleField } from "./ui/TaskTitleField";
import { TaskDescriptionField } from "./ui/TaskDescriptionField";
import { TaskSubtasks } from "./ui/TaskSubtasks";
import { TaskColumnSelect } from "./ui/TaskColumnSelect";
import { TaskType } from "@/common/types/TaskType";
import { TableColumnType } from "@/common/types/TableColumnType";

type EditTaskModalType = {
  open: boolean;
  onClose: VoidFunction;
  tableIndex: number;
  columnIndex: number;
  taskIndex: number;
  task: TaskType;
  columns: TableColumnType[];
};

export function EditTaskModal({
  open,
  onClose: handleClose,
  tableIndex,
  columnIndex,
  taskIndex,
  task,
  columns,
}: Readonly<EditTaskModalType>) {
  const modalProps = { open, onClose: handleClose };

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState<SubtaskType[]>(task.subtasks);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(columnIndex);
  const [showError, setShowError] = useState(false);

  const dispatch = useAppDispatch();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length > 0) {
      dispatch(
        mainActions.updateTask({
          tableIndex,
          oldColumnIndex: columnIndex,
          newColumnIndex: selectedColumnIndex,
          taskIndex,
          task: {
            ...task,
            title,
            description,
            subtasks,
          },
        }),
      );

      handleClose();
    } else {
      setShowError(true);
    }
  };

  const handleOnChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;
    target.value.length > 0 && setShowError(false);
  };

  return (
    <Modal {...modalProps}>
      <form onSubmit={handleOnSubmit} onChange={handleOnChange}>
        <ModalTitle className="mb-7">Edit task</ModalTitle>
        {showError && (
          <div className="text-white flex justify-center items-center text-sm my-1 mx-10 bg-red-600 rounded-2xl">
            {`Board Name shouldn't be empty`}
          </div>
        )}
        <TaskTitleField title={title} setTitle={setTitle} />
        <TaskDescriptionField
          description={description}
          setDescription={setDescription}
        />
        <TasksTitle>Sub tasks</TasksTitle>
        <TaskSubtasks subtasks={subtasks} setSubtasks={setSubtasks} />
        <TaskColumnSelect
          columns={columns}
          selectedIndex={selectedColumnIndex}
          setSelectedIndex={setSelectedColumnIndex}
        />
        <CreateButton type="submit" button_type="primary" className="mt-7">
          Save changes
        </CreateButton>
      </form>
    </Modal>
  );
}

const TasksTitle = tw.h3`
text-white
text-sm
font-bold
`;

const CreateButton = tw(Button)`
flex
items-center
justify-center
w-full
`;
