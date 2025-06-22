import {
  Pagination,
  PaginationItem,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import type { Todo } from "../../services/todoApi";
import { rowsPerPage } from "./TodoTable";
import { ExpandCircleDownOutlined } from "@mui/icons-material";

export default function TodoTableFooter({
  todos,
  page,
  setPage,
}: {
  todos: Todo[];
  page: number;
  setPage: (page: number) => void;
}) {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          key={`footer-${todos.length}`}
          rowsPerPageOptions={[]}
          rowsPerPage={rowsPerPage}
          colSpan={3}
          count={todos.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          ActionsComponent={createTodoPagination(
            todos.length / rowsPerPage - 1
          )}
          sx={{
            "& .MuiToolbar-root": {
              pt: 2.5,
              pl: 0,
              justifyContent: "center",
            },
            "& .MuiTablePagination-spacer": {
              display: "none",
            },
            "& .MuiTablePagination-displayedRows ": {
              display: "none",
            },
          }}
        />
      </TableRow>
    </TableFooter>
  );
}

const createTodoPagination =
  (count: number) =>
  ({
    page,
    onPageChange,
  }: {
    page: number;
    onPageChange: (event: null, newPage: number) => void;
  }) =>
    (
      <Pagination
        color="primary"
        count={count}
        page={page + 1}
        onChange={(_event, value) => onPageChange(null, value - 1)}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: () => (
                <ExpandCircleDownOutlined
                  color="primary"
                  sx={{ transform: "rotate(90deg)" }}
                />
              ),
              next: () => (
                <ExpandCircleDownOutlined
                  color="primary"
                  sx={{ transform: "rotate(-90deg)" }}
                />
              ),
            }}
            {...item}
          />
        )}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "primary.main",
          },
          "& .Mui-selected": {
            color: "white",
          },
        }}
      />
    );
