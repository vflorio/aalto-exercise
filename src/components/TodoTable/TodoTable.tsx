import { useEffect, useMemo, useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTodos } from "../../context/Todos";
import { Label, Panel } from "../Theme";
import TodoTableRow from "./TodoTableRow";
import TodoTableFooter from "./TodoTableFooter";

export const rowsPerPage = 5;

export default function TodoTable() {
  const { todos, isLoading } = useTodos();
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setPageNumber(0);
  }, [todos]);

  const page = useMemo(
    () =>
      todos.slice(
        pageNumber * rowsPerPage,
        pageNumber * rowsPerPage + rowsPerPage
      ),
    [todos, pageNumber]
  );

  const emptyRows =
    pageNumber > 0
      ? Math.max(0, (pageNumber + 1) * rowsPerPage - todos.length)
      : 0;

  return (
    <Panel sx={{ width: 830, height: 630 }}>
      <Table
        sx={{
          "& td": {
            border: "none",
            py: 1,
            px: 0,
          },
          "& th": {
            py: 0,
            px: 1,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 164 }}>
              <Label>User ID</Label>
            </TableCell>
            <TableCell>
              <Label>Title</Label>
            </TableCell>
            <TableCell sx={{ width: 124 }}>
              <Label>Completed</Label>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : !todos.length ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="h6" color="text.secondary">
                  No Todos Found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            page.map((todo) => <TodoTableRow key={todo.id} todo={todo} />)
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 70 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        {todos.length ? (
          <TodoTableFooter
            todos={todos}
            page={pageNumber}
            setPage={setPageNumber}
          />
        ) : null}
      </Table>
    </Panel>
  );
}
