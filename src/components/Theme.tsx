import { styled, Typography, Stack } from "@mui/material";
import { maxWidth } from "../constants";

export const Wrapper = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(2),
  width: "100%",
  maxWidth: `${maxWidth}px`,
}));

export const Panel = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.background.paper,
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: "bold",
  color: theme.palette.primary.main,
  textTransform: "uppercase",
}));
