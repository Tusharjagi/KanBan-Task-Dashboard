import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type createContextType = {
  textAreaId?: string;
  setTextAreaId: (value: string | undefined) => void;
};

const TextAreaContext = createContext<createContextType>({
  textAreaId: "",
  setTextAreaId() {},
});

type TextAreaProviderType = {
  children?: ReactNode;
};

export function TextAreaProvider({ children }: Readonly<TextAreaProviderType>) {
  const [textAreaId, setTextAreaId] = useState<string | undefined>();

  const handleChangeTextAreaId = useCallback(
    (value: string | undefined) => setTextAreaId(value),
    [setTextAreaId],
  );

  const value = useMemo<createContextType>(
    () => ({
      textAreaId: textAreaId,
      setTextAreaId: handleChangeTextAreaId,
    }),
    [textAreaId, handleChangeTextAreaId],
  );

  return (
    <TextAreaContext.Provider value={value}>
      {children}
    </TextAreaContext.Provider>
  );
}

export const useTextAreaContext = () => useContext(TextAreaContext);
