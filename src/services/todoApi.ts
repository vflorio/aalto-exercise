const { VITE_TODOS_API_DOMAIN } = import.meta.env;

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoFilters = {
  title: string;
  completed: boolean;
  userIds: string[];
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

const getParamsQueryString = (filters: TodoFilters): string => {
  const params = new URLSearchParams();

  if (!filters.userIds.length && !filters.title && !filters.completed)
    return "";

  if (filters.userIds.length)
    filters.userIds.forEach((userId) => params.append("userId", userId));

  if (filters.title) params.append("title", filters.title);

  if (filters.completed)
    params.append("completed", JSON.stringify(filters.completed));

  return `?${params}`;
};

export const getTodos = async (
  filters: TodoFilters,
  signal: AbortSignal
): Promise<Todo[] | Error | null> => {
  try {
    const response = await fetch(
      `${VITE_TODOS_API_DOMAIN}/todos${getParamsQueryString(filters)}`,
      {
        signal,
      }
    );

    if (!response.ok) {
      return new Error(`Failed to fetch todos. ${response.statusText}`);
    }

    const data = await response.json();

    if (!validate(data)) return new Error("Invalid data received from API.");

    return data;
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      return new Error("An unknown error occurred while fetching todos.");
    }

    if (error.name === "AbortError") return null;

    return error;
  }
};

export const addTodo = async (todo: Todo): Promise<Todo | Error> => {
  try {
    const response = await fetch(`${VITE_TODOS_API_DOMAIN}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      return new Error(`Failed to add todo. ${response.statusText}`);
    }

    const data = await response.json();
    if (!validate([data])) return new Error("Invalid data received from API.");

    return data;
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      return new Error("An unknown error occurred while adding todo.");
    }

    return error;
  }
};

export const updateTodo = async (todo: Todo): Promise<Todo | Error> => {
  try {
    const response = await fetch(`${VITE_TODOS_API_DOMAIN}/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      return new Error(`Failed to update todo. ${response.statusText}`);
    }

    const data = await response.json();
    if (!validate([data])) return new Error("Invalid data received from API.");

    return data;
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      return new Error("An unknown error occurred while updating todo.");
    }

    return error;
  }
};

export const deleteTodo = async (id: number): Promise<void | Error> => {
  try {
    const response = await fetch(`${VITE_TODOS_API_DOMAIN}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return new Error(`Failed to delete todo. ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      return new Error("An unknown error occurred while deleting todo.");
    }

    return error;
  }
};
