import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type Context = {
  title: string;
  completed: boolean;
  userIds: string[];
  setTitle: Dispatch<SetStateAction<string>>;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  setUserIds: Dispatch<SetStateAction<string[]>>;
  reset: () => void;
};

const FiltersContext = createContext<Context>({} as Context);

export default function FiltersProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [userIds, setUserIds] = useState<string[]>([]);

  const reset = () => {
    setTitle("");
    setCompleted(false);
    setUserIds([]);
  };

  return (
    <FiltersContext.Provider
      value={{
        title,
        completed,
        userIds,
        setTitle,
        setCompleted,
        setUserIds,
        reset,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
