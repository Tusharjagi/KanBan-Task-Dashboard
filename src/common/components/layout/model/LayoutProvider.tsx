import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from "react";

type createContextType = {
  expanded: boolean;
  changeExpanded: (value: boolean) => void;
  toggleExpanded: VoidFunction;
};

const LayoutContext = createContext<createContextType>({
  expanded: true,
  changeExpanded(value) {},
  toggleExpanded() {},
});

type LayoutProviderType = {
  children?: ReactNode;
};

export function LayoutProvider({ children }: Readonly<LayoutProviderType>) {
  const [expanded, setExpanded] = useState(true);

  const handleChangeExpanded = useCallback(
    (value: boolean) => setExpanded(value),
    [setExpanded],
  );

  const handleToggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const value = useMemo<createContextType>(
    () => ({
      expanded,
      changeExpanded: handleChangeExpanded,
      toggleExpanded: handleToggleExpanded,
    }),
    [expanded, handleChangeExpanded, handleToggleExpanded],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export const useLayoutContext = () => useContext(LayoutContext);
