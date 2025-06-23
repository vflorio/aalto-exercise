import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { mobileMediaQuery, theme } from "../theme";
import { SnackbarProvider } from "notistack";
import TodosProvider from "../context/Todos";
import FiltersProvider from "../context/Filters";
import BaseLayout from "./BaseLayout";

export default function App() {
  const mobile = useMediaQuery(mobileMediaQuery);

  return (
    <ThemeProvider theme={theme(mobile ? 6 : 10)}>
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
