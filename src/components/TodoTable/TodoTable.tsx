import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [todos]);

  const emptyRows =
    page > 0 ? Math.max(0, (page + 1) * rowsPerPage - todos.length) : 0;
  console.log({ count: todos.length });
  return (
    <Panel sx={{ width: 830, height: 630 }}>
      <Table
        sx={{
          "& td": {
            border: "none",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" width={96}>
              <Label> User ID</Label>
            </TableCell>
            <TableCell>
              <Label> Title</Label>
            </TableCell>
            <TableCell align="center" width={124}>
              <Label> Completed</Label>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& td": {
              py: 1,
              px: 0,
            },
          }}
        >
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
            (rowsPerPage > 0
              ? todos.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : todos
            ).map((todo) => <TodoTableRow key={todo.id} todo={todo} />)
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 70 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        {todos.length ? (
          <TodoTableFooter todos={todos} page={page} setPage={setPage} />
        ) : null}
      </Table>
    </Panel>
  );
}
