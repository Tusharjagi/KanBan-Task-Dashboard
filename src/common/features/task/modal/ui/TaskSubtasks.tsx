import { Dispatch, SetStateAction, memo } from "react";
import { v4 as uuid } from "uuid";

import { FieldArray } from "@/common/components/field-array";
import { SubtaskType } from "@/common/types/SubtaskType";

type TaskSubtasksType = {
  subtasks: SubtaskType[];
  setSubtasks: Dispatch<SetStateAction<SubtaskType[]>>;
};

export const TaskSubtasks = memo(
  ({ subtasks, setSubtasks }: TaskSubtasksType) => {
    const handleAddSubtask = (value: string) => {
      const newSubtask = {
        id: uuid(),
        title: value,
        doing: false,
      };

      setSubtasks([...subtasks, newSubtask]);
    };

    const handleRemoveSubtask = (index: number) => {
      const newSubtasks = subtasks.filter((_, i) => i !== index);
      setSubtasks(newSubtasks);
    };

    return (
      <div className="mb-7">
        <FieldArray
          values={subtasks}
          setValues={setSubtasks}
          titleSelector="title"
          addValue={handleAddSubtask}
          removeValue={handleRemoveSubtask}
        />
      </div>
    );
  },
);

TaskSubtasks.displayName = "TaskSubtasks";
