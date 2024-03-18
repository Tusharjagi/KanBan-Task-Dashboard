import tw from "tailwind-styled-components";
import Image from "next/image";
import blackLogo from "@/common/assets/brand/black-logo.svg";
import whiteLogo from "@/common/assets/brand/white-logo.svg";
import { useAppSelector } from "@/common/hooks/useRedux";

export function Logo() {
  const { theme } = useAppSelector((x) => x.themeSlice);

  return (
    <div className="flex justify-start items-start">
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
