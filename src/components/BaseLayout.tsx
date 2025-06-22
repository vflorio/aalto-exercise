import { Button, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import FiltersPanel from "./FiltersPanel/FiltersPanel";
import TodoTable from "./Todo/TodoTable";
import { Wrapper } from "./Theme";
import TodoAddOrUpdate from "./Todo/TodoAddOrUpdate";
import { Add } from "@mui/icons-material";

export default function BaseLayout() {
  return (
    <Stack height={"100%"} alignItems={"center"}>
      <Header />
      <Wrapper gap={2} alignItems={"center"}>
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
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <FiltersPanel />
          <TodoTable />
        </Stack>
      </Wrapper>
      <Footer />
    </Stack>
  );
}
