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
  completed: boolean;
  userId: string;
  setFullText: Dispatch<SetStateAction<string>>;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  setUserId: Dispatch<SetStateAction<string>>;
  reset: () => void;
};

const FiltersContext = createContext<Context>({} as Context);

export default function FiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [fullText, setFullText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState("");

  const reset = () => {
    setFullText("");
  };

  return (
    <FiltersContext.Provider
      value={{
        fullText,
        completed,
        userId,
        setFullText,
        setCompleted,
        setUserId,
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
