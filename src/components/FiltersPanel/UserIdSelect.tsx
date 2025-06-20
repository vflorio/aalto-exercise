import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import { useFilters } from "../../context/Filters";
import { Label } from "../Theme";
import { useTodos } from "../../context/Todos";

export default function UserIdSelect() {
  const { setUserId, userId } = useFilters();
  const { uniqueUserIds } = useTodos();

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
