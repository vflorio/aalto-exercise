import {
  Stack,
  Switch as MuiSwitch,
  styled,
  type SwitchProps,
  FormControlLabel,
} from "@mui/material";
import { Label } from "../Theme";
import { useFilters } from "../../context/Filters";

export default function CompletedSwitch() {
  const { completed, setCompleted } = useFilters();
  return (
    <Stack gap={1}>
      <Label>Completed</Label>
      <FormControlLabel
        sx={{
          gap: 1,
          pl: 1,
          color: "primary.main",
          "& span": {
            fontSize: 20,
          },
        }}
        control={
          <Switch
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
          />
        }
        label={completed ? "YES" : "NO"}
      />
    </Stack>
  );
}

const Switch = styled((props: SwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))({
  order: 2,
  width: 100,
  height: 40,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: "6px",
    transitionDuration: "100ms",
    "&.Mui-checked": {
      transform: "translateX(64px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "primary.main",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 25,
    height: 25,
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    backgroundColor: "#bbb",
    opacity: 1,
  },
});
