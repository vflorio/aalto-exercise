import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import { useFiltersContext } from "../../context/Filters";
import { Label } from "../Theme";
import { useTodosContext } from "../../context/Todos";
import { useMemo } from "react";

export default function UserIdSelect() {
  const { setUserId, userId } = useFiltersContext();
  const { todos } = useTodosContext();

  const uniqueUserIds = useMemo(
    () => Array.from(new Set(todos.map((todo) => todo.userId))),
    [todos]
  );

  return (
    <Stack gap={1}>
      <Label>Select User ID</Label>
      <FormControl fullWidth>
        <Select
          labelId="userId-filter-label"
          id="userId-filter"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        >
          {uniqueUserIds.map((userId) => (
            <MenuItem key={userId} value={userId}>
              {userId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
