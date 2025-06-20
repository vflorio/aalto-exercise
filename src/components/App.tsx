import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { SnackbarProvider } from "notistack";
import TodosProvider from "../context/Todos";
import FiltersProvider from "../context/Filters";
import BaseLayout from "./BaseLayout";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <FiltersProvider>
          <TodosProvider>
            <CssBaseline />
            <BaseLayout />
          </TodosProvider>
        </FiltersProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
