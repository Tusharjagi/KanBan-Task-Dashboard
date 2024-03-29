import {
  Children,
  useCallback,
  useMemo,
  useRef,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  useLayoutEffect,
  ReactElement,
} from "react";
import tw from "tailwind-styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { SelectProvider, useSelectContext } from "../model/SelectProvider";
import { useOutside } from "@/common/hooks/useOutside";
import { SelectOption } from "./SelectOption";

type WrappedComponentType = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "onChange"
> & {
  value?: any;
  onChange: (value: any) => void;
  placeHolderText?: string;
};

function WrappedComponent({
  value,
  children,
  placeHolderText = "None",
  ...rest
}: Readonly<Omit<WrappedComponentType, "onChange">>) {
  const labelRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { expanded, viewNode, toggle, changeExpanded, changeValue } =
    useSelectContext();

  useOutside(
    [listRef as any, labelRef],
    useCallback(() => {
      changeExpanded(false);
    }, [changeExpanded]),
  );

  useLayoutEffect(() => {
    Children.forEach(children, (child) => {
      const element = child as ReactElement;
      console.log(element.props.value);
      console.log("value", value);
      if (element.type === SelectOption) {
        if (element.props.value === value) {
          changeValue(value, element.props.children);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const label = viewNode ?? placeHolderText;

  const Icon = useMemo(
    () => (expanded ? FiChevronUp : FiChevronDown),
    [expanded],
  );

  return (
    <Wrapper>
      <SelectLabel type="button" ref={labelRef} onClick={toggle} {...rest}>
        <div className="flex-1 text-left">{label}</div>
        <Icon className="ml-2 text-indigo-500" />
      </SelectLabel>
      {expanded && <SelectList ref={listRef}>{children}</SelectList>}
    </Wrapper>
  );
}

export function Select({
  value,
  onChange,
  ...rest
}: Readonly<WrappedComponentType>) {
  return (
    <SelectProvider value={value} onChange={onChange}>
      <WrappedComponent value={value} {...rest} />
    </SelectProvider>
  );
}

const Wrapper = tw.div`
relative
`;

const SelectLabel = tw.button`
flex
items-center
text-gray-800
dark:text-white
font-bold
text-sm
px-3
py-1
w-full
rounded-md
border-[1px]
h-10
border-montage
`;

const SelectList = tw.ul`
list-none
absolute
left-0
w-full
-bottom-2
translate-y-[100%]
p-2
rounded-md
drop-shadow-md
bg-alice-blue
dark:bg-dark-gunmetal
`;
