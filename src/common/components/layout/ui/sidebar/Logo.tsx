import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import tw from "tailwind-styled-components";
import blackLogo from "@/common/assets/brand/black-logo.svg";
import whiteLogo from "@/common/assets/brand/white-logo.svg";
import { useAppSelector } from "@/common/hooks/useRedux";
import { mainActions } from "@/common/store/slices/main";

export function Logo() {
  const { theme } = useAppSelector((x) => x.themeSlice);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnSelect = (index: number) => () => {
    dispatch(mainActions.updateSelectedTableIndex({ tableIndex: index }));
  };

  return (
    <div className="flex justify-start items-start cursor-pointer " onClick={handleOnSelect(0)}>
      {theme === "dark" ? (
        <LogoStyled alt="Brand logo" src={whiteLogo} />
      ) : (
        <LogoStyled alt="Brand logo" src={blackLogo} />
      )}
    </div>
  );
}

const LogoStyled = tw(Image)`
p-5
h-1/3
w-1/3
`;
