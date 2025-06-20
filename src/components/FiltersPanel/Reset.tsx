import { Button } from "@mui/material";
import { useFilters } from "../../context/Filters";

export default function Reset() {
  const { reset } = useFilters();
  return <Button onClick={reset}>Reset Filters</Button>;
}
