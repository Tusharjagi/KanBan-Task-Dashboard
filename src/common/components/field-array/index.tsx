import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { AiOutlineCloseSquare, AiOutlinePlusSquare } from "react-icons/ai";

import { Button } from "@/common/ui/button";
import { Input, InputField } from "@/common/ui/input";
import tw from "tailwind-styled-components";

type ItemType = {
  id: string;
  [key: string]: any;
};

type FieldArrayType<T extends ItemType, K extends keyof T> = {
  values: T[];
  setValues: Dispatch<SetStateAction<T[]>>;
  titleSelector: K;
  addValue: (value: string) => void;
  removeValue: (index: number) => void;
};

export function FieldArray<T extends ItemType, K extends keyof T>({
  values,
  setValues,
  titleSelector,
  addValue,
  removeValue,
}: Readonly<FieldArrayType<T, K>>) {
  const handleOnChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValues = [...values];
      newValues[index] = {
        ...newValues[index],
        [titleSelector]: e.target.value,
      } as T;

      setValues(newValues);
    };

  const handleRemoveItem = (index: number) => () => {
    removeValue(index);
  };

  return (
    <Wrapper>
      {values.map((item, index) => (
        <div key={item.id} className="flex">
          <Input>
            <InputField value={item.title} onChange={handleOnChange(index)} />
          </Input>
          <ActionButton
            type="button"
            button_type="none"
            corner_type="rounded"
            onClick={handleRemoveItem(index)}
          >
            <AiOutlineCloseSquare className="text-indigo-500 text-xl" />
          </ActionButton>
        </div>
      ))}
      <AddColumnField addColumn={addValue} />
    </Wrapper>
  );
}

const AddColumnField = ({
  addColumn,
}: {
  addColumn: (value: string) => void;
}) => {
  const [title, setTitle] = useState("");

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddItem = () => {
    addColumn(title);
    setTitle("");
  };

  return (
    <div className="flex">
      <Input>
        <InputField value={title} onChange={handleOnChange} />
      </Input>
      <ActionButton
        type="button"
        button_type="none"
        corner_type="rounded"
        onClick={handleAddItem}
      >
        <AiOutlinePlusSquare className="text-indigo-500 text-xl" />
      </ActionButton>
    </div>
  );
};

const Wrapper = tw.div`
space-y-2
`;

const ActionButton = tw(Button)`
flex
items-center
justify-center
p-1
ml-2
bg-black/10
hover:bg-black/20
dark:bg-white/10
dark:hover:bg-opacity-20
w-34
h-34
`;
