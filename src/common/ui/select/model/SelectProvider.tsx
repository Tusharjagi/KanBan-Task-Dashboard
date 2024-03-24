import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useToggler } from "@/common/hooks/useToggler";

type createContextType = {
  value?: any;
  changeValue: (value?: any, node?: ReactNode) => void;
  expanded: boolean;
  toggle: VoidFunction;
  changeExpanded: (value: boolean) => void;
  viewNode?: ReactNode;
};

const SelectContext = createContext<createContextType>({
  expanded: false,
  changeValue() {},
  toggle() {},
  changeExpanded() {},
});

type SelectProviderType = {
  value: any;
  onChange: (value: any) => void;
  children: ReactNode;
};

export function SelectProvider({
  value,
  onChange,
  children,
}: Readonly<SelectProviderType>) {
  const [expanded, toggle, changeExpanded] = useToggler(false);
  const [viewNode, setViewNode] = useState<ReactNode | undefined>();

  const handleChangeValue = useCallback(
    (value?: any, node?: ReactNode) => {
      onChange(value);
      setViewNode(node);
    },
    [onChange],
  );

  const providerValue = useMemo<createContextType>(
    () => ({
      value,
      changeValue: handleChangeValue,
      expanded,
      toggle,
      changeExpanded,
      viewNode,
    }),
    [value, handleChangeValue, expanded, toggle, changeExpanded, viewNode],
  );

  return (
    <SelectContext.Provider value={providerValue}>
      {children}
    </SelectContext.Provider>
  );
}

export const useSelectContext = () => useContext(SelectContext);
