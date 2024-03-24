import tw from "tailwind-styled-components";

type SwitcherType = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function Switcher({ value, onChange }: Readonly<SwitcherType>) {
  const handleOnClick = () => {
    onChange(!value);
  };

  return (
    <Wrapper
      className={value ? "bg-indigo-500" : "bg-indigo-100"}
      onClick={handleOnClick}
    >
      <Input value={`${value}`} type="checkbox" />
      <Circle
        className={
          value
            ? "bg-white translate-x-[100%]"
            : "translate-x-[0%] bg-slate-400"
        }
      />
    </Wrapper>
  );
}

const Wrapper = tw.div`
relative
w-10
h-5
rounded-full
cursor-pointer
`;

const Input = tw.input`
hidden
w-0
h-0
`;

const Circle = tw.span`
absolute
top-[2px]
left-[4px]
block
w-[16px]
h-[16px]
rounded-full
pointer-events-none
transition-transform
`;
