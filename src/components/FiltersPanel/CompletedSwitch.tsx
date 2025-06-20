import { Stack, Switch } from "@mui/material";
import { Label } from "../Theme";
import { useFilters } from "../../context/Filters";

export default function CompletedSwitch() {
  const { completed, setCompleted } = useFilters();
  return (
    <Stack>
      <Label>Completed</Label>
      <Stack direction={"row"} alignItems="center" gap={1}>
        {completed ? "YES" : "NO"}
        <Switch
          value={completed}
          onChange={(event) => setCompleted(event.target.checked)}
        />
      </Stack>
    </Stack>
  );
}
