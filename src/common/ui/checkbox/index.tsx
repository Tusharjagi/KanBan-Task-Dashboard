import tw from "tailwind-styled-components";
import { FaCheck } from "react-icons/fa";

type CheckboxType = {
  id?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
};

export function Checkbox({
  id,
  value,
  onChange,
  className,
}: Readonly<CheckboxType>) {
  const handleOnClick = () => {
    onChange(!value);
  };

  return (
    <Wrapper
      id={id}
      is_active={value + ""}
      className={className}
      onClick={handleOnClick}
    >
      <input className="hidden" value={value.toString()} type="checkbox" />
      {value && <FaCheck />}
    </Wrapper>
  );
}

type WrapperType = {
  is_active?: string;
};

const Wrapper = tw.div<WrapperType>`
flex
items-center
justify-center
text-white
text-xs
border-[1px]
w-4
h-4
${({ is_active }) =>
  is_active ? "bg-indigo-500 border-indigo-400" : "bg-white border-gray-300"}
`;
