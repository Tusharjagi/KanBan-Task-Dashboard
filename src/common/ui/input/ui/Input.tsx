import { ReactNode } from "react";
import { InputProvider } from "../model/InputProvider";

type InputType = {
  children?: ReactNode;
};

export function Input({ children }: Readonly<InputType>) {
  return <InputProvider>{children}</InputProvider>;
}
