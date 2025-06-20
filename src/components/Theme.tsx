import { styled, Typography, Stack, Box } from "@mui/material";
import { maxWidth } from "../constants";

export const Wrapper = styled(Box)(({ theme }) => ({
  px: 2,
  maxWidth: `calc(${maxWidth}px - ${theme.spacing(2)}px)`,
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
