import { Stack, Switch } from "@mui/material";
import { Label } from "../Theme";
import { useFiltersContext } from "../../context/Filters";

export default function CompletedSwitch() {
  const { completed, setCompleted } = useFiltersContext();
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
