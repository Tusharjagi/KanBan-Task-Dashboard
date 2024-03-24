import { ChangeEvent, Dispatch, SetStateAction, memo } from "react";

import { TextArea, TextAreaField, TextAreaLabel } from "@/common/ui/text-area";

type TaskDescriptionFieldType = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

export const TaskDescriptionField = memo(
  ({ description, setDescription }: TaskDescriptionFieldType) => {
    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    };

    return (
      <TextArea>
        <TextAreaLabel>Description</TextAreaLabel>
        <TextAreaField
          id="task-description"
          style={{ resize: "none" }}
          className="h-28 mb-5"
          value={description}
          onChange={handleOnChange}
        />
      </TextArea>
    );
  },
);

TaskDescriptionField.displayName = "TaskDescriptionField";
