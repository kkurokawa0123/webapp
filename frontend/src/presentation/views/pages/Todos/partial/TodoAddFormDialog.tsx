import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

type TodoParams = {
  name: string;
  dialogOpen: boolean;
  onSubmit: () => void;
  onChange: (
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
        todoParams.onSubmit();
      }}
    >
      <div style={{ margin: "1em" }}>
        <TextField
          aria-label="todo-input"
          variant="standard"
          style={{
            width: "100%",
            fontSize: "16px",
            fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          }}
          label="タスクを入力..."
          onChange={(e) => todoParams.onChange(e)}
          value={todoParams.name}
          autoFocus
        />
        <DialogActions>
          <Button
            aria-label="form-add"
            color="secondary"
            onClick={todoParams.onSubmit}
          >
            追加
          </Button>
        </DialogActions>
      </div>
    </form>
  </Dialog>
);
