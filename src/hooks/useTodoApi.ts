import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

const { TODOS_API_DOMAIN } = import.meta.env;

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const useTodoApi = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [todos, setTodos] = useState<Todo[]>([]);

  const get = async (signal: AbortSignal): Promise<unknown | null> => {
    try {
      const response = await fetch(`${TODOS_API_DOMAIN}/todos`, {
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
  });

  return { todos };
};
