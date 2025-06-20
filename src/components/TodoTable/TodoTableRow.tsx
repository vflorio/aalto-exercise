import { Stack, styled, TableCell, TableRow } from "@mui/material";
import type { Todo } from "../../services/todoApi";
import { Check, Close } from "@mui/icons-material";

export default function TodoTableRow({ todo }: { todo: Todo }) {
  return (
    <TableRow key={todo.id}>
      <TableCell>
        <TableCellInner>{todo.userId}</TableCellInner>
      </TableCell>
      <TableCell>
        <TableCellInner
          sx={{
            pl: 2,
            alignItems: "flex-start",
          }}
        >
          {todo.title}
        </TableCellInner>
      </TableCell>
      <TableCell
        sx={{
          "& svg": {
            color: "primary.light",
            fontSize: 28,
          },
        }}
      >
        <TableCellInner>
          {todo.completed ? <Check /> : <Close />}
        </TableCellInner>
      </TableCell>
    </TableRow>
  );
}

const TableCellInner = styled(Stack)(({ theme }) => ({
  backgroundColor: "white",
  borderBottom: "2px solid",
  borderColor: theme.palette.primary.light,
  height: 70,
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
}));
