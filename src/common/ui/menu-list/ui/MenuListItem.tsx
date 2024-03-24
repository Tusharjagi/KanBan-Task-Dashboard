import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import tw from "tailwind-styled-components";

type MenuListItemType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function MenuListItem(props: MenuListItemType) {
  return <Wrapper {...props} />;
}

const Wrapper = tw.button`
flex
items-center
w-full
px-2
py-1
text-gray-800
dark:text-white
rounded
hover:bg-black/10
dark:hover:bg-white/10
`;
