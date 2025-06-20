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
  userId: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  setUserId: Dispatch<SetStateAction<string>>;
  reset: () => void;
};

const FiltersContext = createContext<Context>({} as Context);

export default function FiltersProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState("");

  const reset = () => {
    setTitle("");
    setCompleted(false);
    setUserId("");
  };

  return (
    <FiltersContext.Provider
      value={{
        title,
        completed,
        userId,
        setTitle,
        setCompleted,
        setUserId,
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
