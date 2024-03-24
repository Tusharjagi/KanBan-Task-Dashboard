import { ReactNode } from "react";

import { TextAreaProvider } from "../model/TextAreaProvider";

type TextAreaType = {
  children?: ReactNode;
};

export function TextArea({ children }: Readonly<TextAreaType>) {
  return <TextAreaProvider>{children}</TextAreaProvider>;
}
