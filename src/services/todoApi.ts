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
  signal: AbortSignal,
  filters: TodoFilters
): Promise<Todo[] | Error | null> => {
  try {
    const response = await fetch(
      `${VITE_TODOS_API_DOMAIN}/todos${getParamsQueryString(filters)}`,
      {
        signal,
      }
    );

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
