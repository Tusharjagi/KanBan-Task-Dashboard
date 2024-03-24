import { SubtaskType } from "./SubtaskType";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  subtasks: SubtaskType[];
};
