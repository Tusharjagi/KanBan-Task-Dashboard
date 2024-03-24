import tw from "tailwind-styled-components";

import { SubtaskType } from "@/common/types/SubtaskType";
import { Checkbox } from "@/common/ui/checkbox";
import { bool2string, string2bool } from "@/common/utils";

type SubtaskItemType = {
  subtask: SubtaskType;
  toggleSubtask: VoidFunction;
};

export function SubtaskItem({
  subtask,
  toggleSubtask,
}: Readonly<SubtaskItemType>) {
  return (
    <Wrapper>
      <Checkbox value={subtask.doing} onChange={toggleSubtask} />
      <Title $is_completed={bool2string(subtask.doing)}>{subtask.title}</Title>
    </Wrapper>
  );
}

const Wrapper = tw.li`
flex
items-center
w-full
px-3
py-2
rounded
bg-indigo-500/10
hover:bg-indigo-500/20
`;

type TitleType = {
  $is_completed: "true" | "false";
};

const Title = tw.span<TitleType>`
text-gray-800
dark:text-white
text-sm
ml-2
${({ $is_completed }) =>
  string2bool($is_completed) ? "underline" : "no-underline"}
`;
