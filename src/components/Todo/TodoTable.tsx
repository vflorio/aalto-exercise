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
import { mobileMediaQuery, tableBasis } from "../../theme";

export const rowsPerPage = 5;

export default function TodoTable() {
  const { todos, isQuerying: isLoading } = useTodos();
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
    <Panel
      sx={{
        flexBasis: tableBasis,
        height: 630,
        [`@media ${mobileMediaQuery}`]: {
          flexBasis: "100%",
          height: "100%",
        },
      }}
    >
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
            position: "relative",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: 164,
                [`@media ${mobileMediaQuery}`]: {
                  width: 32,
                },
              }}
            >
              <Label
                sx={{
                  [`@media ${mobileMediaQuery}`]: {
                    width: 60,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                }}
              >
                User ID
              </Label>
            </TableCell>
            <TableCell>
              <Label
                sx={{
                  [`@media ${mobileMediaQuery}`]: {
                    textAlign: "center",
                  },
                }}
              >
                Title
              </Label>
            </TableCell>
            <TableCell
              sx={{
                width: 124,
                [`@media ${mobileMediaQuery}`]: {
                  width: 48,
                },
              }}
            >
              <Label
                sx={{
                  [`@media ${mobileMediaQuery}`]: {
                    position: "absolute",
                    top: 0,
                    right: 0,
                  },
                }}
              >
                Completed
              </Label>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            // Non conosco un modo migliore per fare gap tra head e body :C
            position: "relative",
            top: 20,
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
