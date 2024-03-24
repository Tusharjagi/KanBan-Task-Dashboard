import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type InputContextType = {
  inputId?: string;
  setInputId: (value: string | undefined) => void;
};

const InputContext = createContext<InputContextType>({
  inputId: "",
  setInputId() {},
});

type InputProviderType = {
  children?: ReactNode;
};

export function InputProvider({ children }: Readonly<InputProviderType>) {
  const [inputId, setInputId] = useState<string | undefined>();

  const handleChangeInputId = useCallback(
    (value: string | undefined) => setInputId(value),
    [setInputId],
  );

  const value = useMemo(
    () => ({
      inputId,
      setInputId: handleChangeInputId,
    }),
    [inputId, handleChangeInputId],
  );

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
}

export const useInputContext = () => useContext(InputContext);
