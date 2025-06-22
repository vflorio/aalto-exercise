import { FormControl, Input, MenuItem, Select, Stack } from "@mui/material";
import { useFilters } from "../../context/Filters";
import { Label } from "../Theme";
import { useTodos } from "../../context/Todos";
import { ExpandCircleDownOutlined } from "@mui/icons-material";

export default function UserIdSelect() {
  const { setUserId, userId } = useFilters();
  const { uniqueUserIds } = useTodos();

  return (
    <Stack gap={1}>
      <Label>Select User ID</Label>
      <FormControl
        fullWidth
        sx={{
          "& svg": {
            color: "primary.main",
          },
        }}
      >
        <Select
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          IconComponent={(props) => <ExpandCircleDownOutlined {...props} />}
          input={
            <Input
              disableUnderline
              sx={{
                px: 1,
                height: 50,
                border: "1px solid",
                borderColor: "primary.main",
              }}
            />
          }
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
