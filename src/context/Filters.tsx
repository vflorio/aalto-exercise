import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type Context = {
  fullText: string;
  setFullText: Dispatch<SetStateAction<string>>;
  reset: () => void;
};

export const FiltersContext = createContext<Context>({} as Context);

export function FiltersContextProvider({ children }: { children: ReactNode }) {
  const [fullText, setFullText] = useState("");

  const reset = () => {
    setFullText("");
  };

  return (
    <FiltersContext.Provider
      value={{
        fullText,
        setFullText,
        reset,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error(
      "useFiltersContext must be used within a FiltersContextProvider"
    );
  }
  return context;
};
