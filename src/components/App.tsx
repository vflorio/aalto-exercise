import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { SnackbarProvider } from "notistack";
import BaseLayout from "./BaseLayout";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <BaseLayout />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
