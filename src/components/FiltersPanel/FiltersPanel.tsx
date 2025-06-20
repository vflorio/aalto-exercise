import { Label, Panel } from "../Theme";
import Search from "./SearchField";
import CompletedSwitch from "./CompletedSwitch";
import UserIdSelect from "./UserIdSelect";
import Reset from "./Reset";

export default function FiltersPanel() {
  return (
    <Panel width={330} gap={3}>
      <Label sx={{ fontSize: 36, textAlign: "center" }}>Filters</Label>
      <Search />
      <CompletedSwitch />
      <UserIdSelect />
      <Reset />
    </Panel>
  );
}
