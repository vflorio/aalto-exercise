import { Label, Panel } from "../Theme";
import Search from "./Search";

export default function FiltersPanel() {
  return (
    <Panel width={330}>
      <Label sx={{ fontSize: 36, textAlign: "center" }}>Filters Panel</Label>
      <Search />
    </Panel>
  );
}
