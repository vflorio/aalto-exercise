import { Button } from "@mui/material";
import { useFiltersContext } from "../../context/Filters";

export default function Reset() {
  const { reset } = useFiltersContext();
  return <Button onClick={reset}>Reset Filters</Button>;
}
