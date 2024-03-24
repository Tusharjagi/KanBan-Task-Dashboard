import { ReactNode, useEffect, useState } from "react";
import tw from "tailwind-styled-components";

import { useLayoutContext } from "../../model/LayoutProvider";
import { Menu } from "./Menu";
import { useMediaQuery } from "@/common/hooks/useMediaQuery";
import { bool2string, string2bool } from "@/common/utils";

type HeaderType = {
  children?: ReactNode;
};

export function Header({ children }: Readonly<HeaderType>) {
  const { expanded } = useLayoutContext();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Wrapper $expanded={bool2string(expanded && mounted && isDesktop)}>
      {children}
      <Menu open={open} setOpen={setOpen} />
    </Wrapper>
  );
}

type WrapperType = {
  $expanded: "true" | "false";
};

const Wrapper = tw.header<WrapperType>`
flex
items-center
justify-between
fixed
top-0
transition-none
md:transition-all
right-0
h-16
p-5
md:h-20
z-50
bg-white
dark:bg-gunmetal
${({ $expanded }) => (string2bool($expanded) ? "left-[256px]" : "left-0")}
`;
