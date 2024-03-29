import { SubtaskType } from "@/common/types/SubtaskType";
import tw from "tailwind-styled-components";
import { SubtaskItem } from "./SubtaskItem";
import { useAppDispatch } from "@/common/hooks/useRedux";
import { mainActions } from "@/common/store/slices/main";

type SubtaskListType = {
  tableIndex: number;
  columnIndex: number;
  taskIndex: number;
  subtasks: SubtaskType[];
};

export function SubtaskList({
  tableIndex,
  columnIndex,
  taskIndex,
  subtasks,
}: Readonly<SubtaskListType>) {
  const dispatch = useAppDispatch();

  const handleToggleSubtask = (subtaskIndex: number) => () => {
    dispatch(
      mainActions.toggleSubtask({
        tableIndex,
        columnIndex,
        taskIndex,
        subtaskIndex,
      }),
    );
  };
  return (
    <Wrapper>
      {subtasks.map((e, index) => (
        <SubtaskItem
          key={e.id}
          subtask={e}
          toggleSubtask={handleToggleSubtask(index)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = tw.ul`
list-none
space-y-2
mb-7
`;
