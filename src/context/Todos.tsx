import { useFilters } from "./Filters";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSnackbar } from "notistack";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  type Todo,
} from "../services/todoApi";

type Context = {
  todos: Todo[];
  uniqueUserIds: string[];
  isQuerying: boolean;
  isMutating: boolean;
  add: (todo: Todo) => Promise<void>;
  update: (todo: Todo) => Promise<void>;
  remove: (todo: Todo) => Promise<void>;
};

const TodosContext = createContext<Context>({} as Context);

export default function TodosProvider({ children }: { children: ReactNode }) {
  const { enqueueSnackbar } = useSnackbar();
  const { title, completed, userIds } = useFilters();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [uniqueUserIds, setUniqueUserIds] = useState<string[]>([]);

  const [isQuerying, setIsQuerying] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsQuerying(true);
    getTodos(
      {
        title,
        completed,
        userIds,
      },
      controller.signal
    )
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
        setIsQuerying(false);
      });

    return () => {
      controller.abort();
    };
  }, [userIds, completed, title]);

  const createMutation =
    (mutationFn: (todo: Todo) => Promise<Todo | Error>, action: string) =>
    async (todo: Todo) => {
      setIsMutating(true);

      const data = await mutationFn(todo);

      if (data instanceof Error) {
        enqueueSnackbar(data.message, {
          variant: "error",
        });
        setIsMutating(false);
        return;
      }

      setIsMutating(false);
      enqueueSnackbar(`Todo ${action} successfully`, {
        variant: "success",
      });
    };

  // Lo stato viene modificato manualmente al posto di rifare la query perché il servizio non supporta le mutazione

  const add = createMutation(async (todo: Todo) => {
    const newTodo = await addTodo(todo);

    if (newTodo instanceof Error) return newTodo;

    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  }, "added");

  const update = createMutation(async (todo: Todo) => {
    const updatedTodo = await updateTodo(todo);

    if (updatedTodo instanceof Error) return updatedTodo;

    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updatedTodo : t)));
    return updatedTodo;
  }, "updated");

  const remove = createMutation(async (todo: Todo) => {
    const deletedTodo = await deleteTodo(todo.id);
    if (deletedTodo instanceof Error) return deletedTodo;

    setTodos((current) => current.filter((entry) => entry.id !== todo.id));
    return todo;
  }, "deleted");

  return (
    <TodosContext.Provider
      value={{
        todos,
        uniqueUserIds,
        isQuerying,
        isMutating,
        add,
        update,
        remove,
      }}
    >
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
