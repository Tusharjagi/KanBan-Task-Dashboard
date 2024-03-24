import { DetailedHTMLProps, LabelHTMLAttributes } from "react";
import tw from "tailwind-styled-components";

import { useTextAreaContext } from "../model/TextAreaProvider";

type TextAreaLabelType = Omit<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  "htmlFor"
>;

export function TextAreaLabel(props: Readonly<TextAreaLabelType>) {
  const { textAreaId } = useTextAreaContext();

  return <Wrapper htmlFor={textAreaId} {...props} />;
}

const Wrapper = tw.label`
w-full
text-gray-800
dark:text-white
text-sm
mb-2
font-bold
`;
