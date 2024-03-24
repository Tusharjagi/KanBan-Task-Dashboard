import { TaskType } from "./TaskType";

export type TableColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};
