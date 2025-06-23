import {
  Button,
  Collapse,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import FiltersPanel from "./FiltersPanel/FiltersPanel";
import TodoTable from "./Todo/TodoTable";
import { Wrapper } from "./Theme";
import TodoAddOrUpdate from "./Todo/TodoAddOrUpdate";
import { Add, FilterList } from "@mui/icons-material";
import { mobileMediaQuery } from "../theme";
import { useFilters } from "../context/Filters";

export default function BaseLayout() {
  const { panelOpen, togglePanel } = useFilters();
  const isMobile = useMediaQuery(mobileMediaQuery);

  return (
    <Stack height={"100%"} alignItems={"center"}>
      <Header />
      <Wrapper gap={2} alignItems={"center"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Button
            color="primary"
            onClick={() => togglePanel()}
            variant={panelOpen ? "contained" : "outlined"}
            sx={{ visibility: isMobile ? "visible" : "hidden" }}
          >
            <FilterList />
          </Button>
          <TodoAddOrUpdate
            renderButton={(open) => (
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "fit-content", alignSelf: "flex-end" }}
                onClick={open}
                startIcon={<Add />}
              >
                Add Todo
              </Button>
            )}
          />
        </Stack>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent={"space-between"}
          width={"100%"}
          gap={2}
        >
          <Collapse in={isMobile ? panelOpen : true}>
            <FiltersPanel />
          </Collapse>
          <TodoTable />
        </Stack>
      </Wrapper>
      <Footer />
    </Stack>
  );
}
