import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

import { ThemeSwitch } from "@/common/features/theme/switcher";
import { HideSidebarButton } from "./HideButton";
import { bool2string, string2bool } from "@/common/utils";
import { TableList } from "@/common/components/table/list";
import { Logo } from "./Logo";

type SidebarType = {
  expanded: boolean;
  isDesktop: boolean;
};

export function Sidebar({ expanded, isDesktop }: Readonly<SidebarType>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && !isDesktop) {
    return null;
  }

  return (
    <>
      <SideBarWrapper>
        <Wrapper $expanded={bool2string(expanded)}>
          <div>
            <Logo />
            <TableList />
          </div>
          <div className="mb-16 pr-2">
            <ThemeSwitch />
          </div>
        </Wrapper>
      </SideBarWrapper>
      <HideSidebarButton />
    </>
  );
}

const SideBarWrapper = tw.div`
fixed
top-0
left-0
min-h-screen
w-64
`;

type WrapperType = {
  $expanded: "true" | "false";
};

const Wrapper = tw.aside<WrapperType>`
absolute
top-0
flex
flex-col
justify-between
bg-white
dark:bg-gunmetal
w-full
min-h-screen
border-r-[1px]
border-r-gray-600
transition-none
md:transition-all
${({ $expanded }) => (string2bool($expanded) ? "left-0" : "-left-[100%]")}
`;
