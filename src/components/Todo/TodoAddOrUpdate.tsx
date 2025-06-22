import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState, type ReactNode } from "react";
import { useTodos } from "../../context/Todos";
import type { Todo } from "../../services/todoApi";

export default function TodoAddOrUpdate({
  todo,
  renderButton,
}: {
  todo?: Todo;
  renderButton: (openDialog: () => void) => ReactNode;
}) {
  const { add, update, remove, isMutating } = useTodos();

  const [open, setOpen] = useState(false);

  const [userId, setUserId] = useState(todo?.userId || 1);
  const [title, setTile] = useState(todo?.title || "");
  const [completed, setCompleted] = useState(todo?.completed || false);

  const [label, mutate]: [string, (todo: Todo) => Promise<void>] = !todo
    ? ["Add", add]
    : ["Update", update];

  const clean = () => {
    setOpen(false);

    if (todo) return;

    setTile("");
    setUserId(1);
    setCompleted(false);
  };

  const save = () =>
    mutate({
      id: todo?.id ?? Math.floor(Math.random() * 1000000),
      userId,
      title,
      completed,
    }).then(clean);

  return (
    <>
      {renderButton(() => setOpen(true))}
      <Dialog onClose={clean} open={open} fullWidth maxWidth="sm">
        <DialogTitle>{label} Todo</DialogTitle>
        <DialogContent>
          <Stack gap={1}>
            <TextField
              label="User ID"
              fullWidth
              variant="standard"
              type="number"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
            />
            <TextField
              autoFocus
              label="Title"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => setTile(e.target.value)}
            />
            <FormControlLabel
              label="Completed"
              control={
                <Checkbox
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          {todo ? (
            <>
              <Button onClick={() => remove(todo)} color="error">
                Delete
              </Button>
              <span style={{ flexGrow: 1 }} />
            </>
          ) : null}
          <Button onClick={clean}>Cancel</Button>
          <Button
            onClick={save}
            variant="contained"
            color="primary"
            disabled={!title || isMutating}
            startIcon={isMutating && <CircularProgress size={12} />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
