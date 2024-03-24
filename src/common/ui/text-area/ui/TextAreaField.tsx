import { DetailedHTMLProps, TextareaHTMLAttributes, useEffect } from "react";
import tw from "tailwind-styled-components";

import { useTextAreaContext } from "../model/TextAreaProvider";

type TextAreaFieldType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export function TextAreaField({ id, ...rest }: TextAreaFieldType) {
  const { setTextAreaId } = useTextAreaContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTextAreaId(id), [id]);

  return <Wrapper id={id} {...rest} />;
}

const Wrapper = tw.textarea`
text-gray-800
dark:text-white
w-full
px-2
py-1
rounded
border-[1px]
border-montage
focus:outline-none
focus:border-indigo-500
placeholder:text-gray-600
bg-transparent
`;
