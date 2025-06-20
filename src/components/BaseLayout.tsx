import { Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import FiltersPanel from "./FiltersPanel/FiltersPanel";
import TodoList from "./TodoList/TodoList";
import { Wrapper } from "./Theme";

export default function BaseLayout() {
  return (
    <Stack height={"100%"} gap={4}>
      <Header />
      <div />
      <Wrapper>
        <Stack direction={"row"} gap={6} justifyContent={"center"}>
          <FiltersPanel />
          <TodoList />
        </Stack>
      </Wrapper>
      <Footer />
    </Stack>
  );
}
