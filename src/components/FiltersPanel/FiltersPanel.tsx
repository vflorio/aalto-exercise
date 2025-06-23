import { Label, Panel } from "../Theme";
import Search from "./SearchField";
import CompletedSwitch from "./CompletedSwitch";
import UserIdSelect from "./UserIdSelect";
import Reset from "./Reset";
import { filtersBasis } from "../../theme";

export default function FiltersPanel() {
  return (
    <Panel flexBasis={filtersBasis} height={"100%"} gap={3}>
      <Label sx={{ fontSize: 36, textAlign: "center" }}>Filters</Label>
      <Search />
      <CompletedSwitch />
      <UserIdSelect />
      <Reset />
    </Panel>
  );
}
