import React, { useEffect } from "react";

import tw from "tailwind-styled-components";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { Switcher } from "@/common/ui/switcher";
import { useAppDispatch, useAppSelector } from "@/common/hooks/useRedux";
import { themeActions } from "@/common/store/slices/theme";

export function ThemeSwitch() {
  const theme = useAppSelector((x) => x.themeSlice.theme);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const htmlClasses = document.querySelector("html")!.classList;
    const isDarkMode = theme == "dark";
    isDarkMode ? htmlClasses.add("dark") : htmlClasses.remove("dark");
  }, [theme]);

  const handleOnChange = (value: boolean) => {
    dispatch(themeActions.changeTheme(value ? "dark" : "light"));
  };

  const isDarkMode = theme == "dark";

  return (
    <ThemeSwitchStyled>
      <BsFillSunFill className="text-gray-800 dark:text-white mr-3 text-sm" />
      <Switcher value={isDarkMode} onChange={handleOnChange} />
      <BsFillMoonStarsFill className="text-gray-800 dark:text-white ml-3 text-sm" />
    </ThemeSwitchStyled>
  );
}

const ThemeSwitchStyled = tw.div`
flex
items-center
justify-center
p-3
rounded-md
mx-5
bg-alice-blue
dark:bg-dark-gunmetal
`;
