import { Stack, styled, TableCell, TableRow } from "@mui/material";
import type { Todo } from "../../services/todoApi";
import { Check, Close } from "@mui/icons-material";

export default function TodoTableRow({ todo }: { todo: Todo }) {
  return (
    <TableRow key={todo.id}>
      <TableCell>
        <TableCellInner px={4}>{todo.userId}</TableCellInner>
      </TableCell>
      <TableCell>
        <TableCellInner px={1}>
          <Title>{todo.title}</Title>
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
        <TableCellInner alignItems={"center"}>
          {todo.completed ? <Check /> : <Close />}
        </TableCellInner>
      </TableCell>
    </TableRow>
  );
}

const TableCellInner = styled(Stack)(({ theme }) => ({
  height: 70,
  justifyContent: "center",
  fontSize: 16,
  backgroundColor: "white",
  borderBottom: "2px solid",
  borderColor: theme.palette.primary.light,
}));

const Title = styled("span")({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
