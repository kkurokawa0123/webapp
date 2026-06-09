import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

type TodoParams = {
  todoName: string;
  dialogOpen: boolean;
  onCreateTodo: () => void;
  onChangeTodo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onToggleDialog: () => void;
};

export const TodoAddFormDialog = (todoParams: TodoParams) => (
  <Dialog
    fullWidth
    open={todoParams.dialogOpen}
    onClose={todoParams.onToggleDialog}
  >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        todoParams.onCreateTodo();
      }}
    >
      <div style={{ margin: "1em" }}>
        <TextField
          name="name"
          aria-label="todo-input"
          variant="standard"
          style={{
            width: "100%",
            fontSize: "16px",
            fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          }}
          label="タスクを入力..."
          onChange={(e) => todoParams.onChangeTodo(e)}
          value={todoParams.todoName}
          autoFocus
        />
        <DialogActions>
          <Button
            aria-label="form-add"
            color="secondary"
            onClick={todoParams.onCreateTodo}
            disabled={todoParams.todoName.length === 0}
          >
            追加
          </Button>
        </DialogActions>
      </div>
    </form>
  </Dialog>
);
