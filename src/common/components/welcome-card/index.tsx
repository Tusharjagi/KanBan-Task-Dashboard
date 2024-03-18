import Image from "next/image";
import { useDispatch } from "react-redux";

import tw from "tailwind-styled-components";
import rocketIllustration from "@/common/assets/img/rocket.png";
import { Button } from "@/common/ui/button";
import { mainActions } from "@/common/store/slices/main";

export function WelcomeCard() {
  const dispatch = useDispatch();

  const handleOnClick = (index: number) => () => {
    dispatch(mainActions.updateSelectedTableIndex({ tableIndex: index }));
  };

  return (
    <Wrapper>
      <RocketImage src={rocketIllustration} alt="Rocket illustration" />
      <Title>
        Hi 👋 <br />
        Welcome to Your Personal Task Manager
      </Title>
      <Description>
        Centralize tasks, prioritize lists, track progress, boost productivity, achieve goals
        effortlessly with our streamlined task manager.
      </Description>
      <GetStartedButton onClick={handleOnClick(0)}>Get started</GetStartedButton>
    </Wrapper>
  );
}

const Wrapper = tw.div`
p-7
rounded-md
bg-white
dark:bg-gunmetal
mx-auto
text-gray-800
dark:text-white
text-center
`;

const RocketImage = tw(Image)`
mx-auto
max-w-180
mb-7
`;

const Title = tw.h2`
font-bold
text-xl
mb-5
`;

const Description = tw.p`
text-base
max-w-md
mb-7
`;

const GetStartedButton = tw(Button)`
px-5
`;
