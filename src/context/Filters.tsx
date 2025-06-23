import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { TodoFilters } from "../services/todoApi";

type Context = TodoFilters & {
  setTitle: Dispatch<SetStateAction<TodoFilters["title"]>>;
  setCompleted: Dispatch<SetStateAction<TodoFilters["completed"]>>;
  setUserIds: Dispatch<SetStateAction<TodoFilters["userIds"]>>;
  reset: () => void;
  panelOpen: boolean;
  togglePanel: () => void;
};

const FiltersContext = createContext<Context>({} as Context);

export default function FiltersProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [userIds, setUserIds] = useState<string[]>([]);

  const [panelOpen, setPanelOpen] = useState(false);

  const reset = () => {
    setTitle("");
    setCompleted(false);
    setUserIds([]);
  };

  return (
    <FiltersContext.Provider
      value={{
        title,
        setTitle,
        completed,
        setCompleted,
        userIds,
        setUserIds,
        reset,
        panelOpen,
        togglePanel: () => setPanelOpen((current) => !current),
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
