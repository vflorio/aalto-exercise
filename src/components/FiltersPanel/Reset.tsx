import { Typography } from "@mui/material";
import { useFilters } from "../../context/Filters";

export default function Reset() {
  const { reset } = useFilters();
  return (
    <Typography
      sx={{
        fontSize: 20,
        textAlign: "center",
        color: "primary.main",
        cursor: "pointer",
        textUnderlineOffset: 4,
        textDecoration: "underline",
      }}
      onClick={reset}
    >
      Reset Filters
    </Typography>
  );
}
