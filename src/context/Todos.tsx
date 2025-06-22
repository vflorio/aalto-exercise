import { useFilters } from "./Filters";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSnackbar } from "notistack";
import { getTodos, type Todo } from "../services/todoApi";

type Context = {
  todos: Todo[];
  uniqueUserIds: string[];
  isLoading: boolean;
};

const TodosContext = createContext<Context>({} as Context);

export default function TodosProvider({ children }: { children: ReactNode }) {
  const { enqueueSnackbar } = useSnackbar();
  const { title, completed, userIds } = useFilters();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueUserIds, setUniqueUserIds] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    getTodos(controller.signal, {
      title,
      completed,
      userIds,
    })
      .then((data) => {
        if (!data) return;
        if (data instanceof Error) {
          enqueueSnackbar(data.message, {
            variant: "error",
          });
          return;
        }
        if (!userIds.length)
          setUniqueUserIds(
            Array.from(new Set(data.map((todo) => `${todo.userId}`)))
          );

        setTodos(data);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [userIds, completed, title]);

  return (
    <TodosContext.Provider value={{ todos, uniqueUserIds, isLoading }}>
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
