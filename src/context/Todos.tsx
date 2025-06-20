import { useFiltersContext } from "./Filters";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSnackbar } from "notistack";

const { VITE_TODOS_API_DOMAIN } = import.meta.env;

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Context = { todos: Todo[] };

const TodosContext = createContext<Context>({} as Context);

export default function TodosProvider({ children }: { children: ReactNode }) {
  const { enqueueSnackbar } = useSnackbar();
  const [todos, setTodos] = useState<Todo[]>([]);
  const {} = useFiltersContext();

  const get = async (signal: AbortSignal): Promise<unknown | null> => {
    try {
      const response = await fetch(`${VITE_TODOS_API_DOMAIN}/todos`, {
        signal,
      });

      return response.json();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return null;
      }

      console.error(error);

      enqueueSnackbar("Errror fetching todos. Please try again later.", {
        variant: "error",
      });
      return null;
    }
  };

  const validate = (data: unknown): data is Todo[] => {
    if (!Array.isArray(data)) return false;
    return data.every(
      (item) =>
        typeof item?.userId === "number" &&
        typeof item?.id === "number" &&
        typeof item?.title === "string" &&
        typeof item?.completed === "boolean"
    );
  };

  useEffect(() => {
    const controller = new AbortController();

    get(controller.signal).then((data) => {
      if (!data) return;

      if (!validate(data)) {
        enqueueSnackbar("Invalid data received from API.", {
          variant: "error",
        });
        return;
      }

      setTodos(data);
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <TodosContext.Provider value={{ todos }}>{children}</TodosContext.Provider>
  );
}

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return context;
};
